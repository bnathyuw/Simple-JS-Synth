/*jslint browser: true */
/*global webkitAudioContext: false, OscillatorJavaScriptNode: false,
	Oscillator: false, CallbackGenerator: false, SineWave: false, FrequencyCentrer: false,
	AmplitudeModulator: false */
(function () {
	"use strict";

	var carrierSlider = document.getElementsByName("carrier")[0],
		modulatorSlider = document.getElementsByName("modulator")[0],
		playButton = document.getElementsByName("play")[0],
		stopButton = document.getElementsByName("stop")[0],
		carrierSpan = document.createElement("span"),
		modulatorSpan = document.createElement("span"),
		context = new SynthAudioContext(),
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
			oscillatorNode = context.createAmplitudeModulatorNode({
				carrier: context.createOscillator({
					amplitude: 1,
					frequency: getCarrier,
					waveTable: context.sineWave
				}),
				frequency: getModulator
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