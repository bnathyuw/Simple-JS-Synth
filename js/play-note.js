/*jslint browser: true */
/*global webkitAudioContext: false, OscillatorJavaScriptNode: false, Oscillator: false */
(function () {
	"use strict";

	var freqSlider = document.getElementsByName("frequency")[0],
		ampSlider = document.getElementsByName("amplitude")[0],
		waveformRadios = document.getElementsByName("waveform"),
		playButton = document.getElementsByName("play")[0],
		stopButton = document.getElementsByName("stop")[0],
		freqSpan = document.createElement("span"),
		ampSpan = document.createElement("span"),
		context = new SynthAudioContext(),
		oscillatorNode,

		getFreq = function () {
			return 440 * Math.pow(2, freqSlider.value);
		},

		getAmp = function () {
			return +ampSlider.value;
		},

		getWaveform = function () {
			var i,
				length,
				radio;
			for (i = 0, length = waveformRadios.length; i < length; i = i + 1) {
				radio = waveformRadios[i];
				if (radio.checked) {
					return radio.value;
				}
			}
			return "SineWave";
		},

		updateFreq = function () {
			freqSpan.innerText = getFreq();
		},

		updateAmp = function () {
			ampSpan.innerText = getAmp();
		},

		stop = function () {
			oscillatorNode.disconnect();
		},

		play = function () {
			if (oscillatorNode) {
				stop();
			}
			oscillatorNode = context.createOscillatorNode({
				frequency: getFreq(),
				amplitude: getAmp(),
				waveTable: context[getWaveform()]
			});
			oscillatorNode.connect(context.destination);
		};

	updateFreq();
	updateAmp();

	freqSlider.parentNode.appendChild(freqSpan);
	ampSlider.parentNode.appendChild(ampSpan);

	freqSlider.addEventListener("change", updateFreq);
	ampSlider.addEventListener("change", updateAmp);

	playButton.addEventListener("click", play);
	stopButton.addEventListener("click", stop);
}());