/*jslint browser: true */
/*global webkitAudioContext: false, OscillatorJavaScriptNode: false,
	Oscillator: false, CallbackGenerator: false, SineWave: false,
	FrequencyCentrer: false, OscillatorAdder: false,
	FrequencyModulationGenerator: false	*/
(function () {
	"use strict";

	var carrierSlider = document.getElementsByName("carrier")[0],
		modulatorSlider = document.getElementsByName("modulator")[0],
		modulationIndexSlider = document.getElementsByName("modulation-index")[0],
		playButton = document.getElementsByName("play")[0],
		stopButton = document.getElementsByName("stop")[0],
		carrierSpan = document.createElement("span"),
		modulatorSpan = document.createElement("span"),
		modulationIndexSpan = document.createElement("span"),
		AC = webkitAudioContext,
		context = new AC(),
		oscillatorNode,

		getCarrier = function () {
			return 440 * Math.pow(2, +carrierSlider.value);
		},

		getModulator = function () {
			return +modulatorSlider.value;
		},

		getModulationIndex = function () {
			return +modulationIndexSlider.value;
		},

		updateCarrier = function () {
			carrierSpan.innerText = getCarrier();
		},

		updateModulator = function () {
			modulatorSpan.innerText = getModulator();
		},

		updateModulationIndex = function () {
			modulationIndexSpan.innerText = getModulationIndex();
		},

		stop = function () {
			oscillatorNode.disconnect();
		},

		play = function () {
			if (oscillatorNode) {
				stop();
			}
			oscillatorNode = new OscillatorJavaScriptNode({
				context: context,
				oscillator: new FrequencyModulationGenerator({
					carrierFrequency: new CallbackGenerator({callback: getCarrier}),
					carrierAmplitude: new EnvelopeGenerator({
						waveTable: new ADSRWave({
							attackTime: 0.2,
							decayTime: 0.2,
							sustainLevel: 0.2,
							sustainTime: 0.4,
							releaseTime: 0.2
						}),
						duration: 2,
						sampleRate: context.sampleRate,
						amplitude: 1
					}),
					modulatorFrequency: new EnvelopeGenerator({
						waveTable: {
							getValue: function (index) {
								return 460 - index * 10 - Math.sin(index * Math.PI) * 10;
							}
						},
						duration: 2,
						sampleRate: context.sampleRate,
						amplitude: 1
					}),
					modulationIndex: new CallbackGenerator({callback: getModulationIndex}),
					sampleRate: context.sampleRate
				})
			});
			oscillatorNode.connect(context.destination);
		};

	updateCarrier();
	updateModulator();
	updateModulationIndex();

	carrierSlider.parentNode.appendChild(carrierSpan);
	modulatorSlider.parentNode.appendChild(modulatorSpan);
	modulationIndexSlider.parentNode.appendChild(modulationIndexSpan);

	carrierSlider.addEventListener("change", updateCarrier);
	modulatorSlider.addEventListener("change", updateModulator);
	modulationIndexSlider.addEventListener("change", updateModulationIndex);

	playButton.addEventListener("click", play);
	stopButton.addEventListener("click", stop);
}());
