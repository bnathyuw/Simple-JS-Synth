/*jslint browser: true */
/*global OscillatorJavaScriptNode: false,
	FrequencyModulationGenerator: false, SynthAudioContext: false	*/
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
		context = new SynthAudioContext(),
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
			oscillatorNode = context.createFrequencyModulationGeneratorNode({
				carrierFrequency: getCarrier,
				modulatorFrequency: getModulator,
				modulationIndex: getModulationIndex
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