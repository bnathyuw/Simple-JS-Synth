/*jslint browser: true */
/*global webkitAudioContext: false, OscillatorJavaScriptNode: false,
	Oscillator: false, CallbackGenerator: false, SineWave: false, FrequencyCentrer: false */
(function () {
	"use strict";

	var carrierSlider = document.getElementsByName("carrier")[0],
		modulatorSlider = document.getElementsByName("modulator")[0],
		playButton = document.getElementsByName("play")[0],
		stopButton = document.getElementsByName("stop")[0],
		carrierSpan = document.createElement("span"),
		modulatorSpan = document.createElement("span"),
		AC = webkitAudioContext,
		context = new AC(),
		oscillatorNode,

		getCarrier = function () {
			return 440 * Math.pow(2, carrierSlider.value);
		},

		getModulator = function () {
			return +modulatorSlider.value;
		},

		updateCarrier = function () {
			carrierSpan.innerText = getCarrier();
		},

		updateModulator = function () {
			modulatorSpan.innerText = getModulator();
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
				oscillator: new Oscillator({
					frequency: new FrequencyCentrer({
						wave: new Oscillator({
							frequency: new CallbackGenerator({callback: getModulator}),
							amplitude: 1,
							waveTable: new SineWave(),
							sampleRate: context.sampleRate
						}),
						frequency: new CallbackGenerator({callback: getCarrier})
					}),
					amplitude: 1,
					waveTable: new SineWave(),
					sampleRate: context.sampleRate
				})
			});
			oscillatorNode.connect(context.destination);
		};

	updateCarrier();
	updateModulator();

	carrierSlider.parentNode.appendChild(carrierSpan);
	modulatorSlider.parentNode.appendChild(modulatorSpan);

	carrierSlider.addEventListener("change", updateCarrier);
	modulatorSlider.addEventListener("change", updateModulator);

	playButton.addEventListener("click", play);
	stopButton.addEventListener("click", stop);
}());