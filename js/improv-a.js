/*jslint browser: true */
/*global webkitAudioContext: false, OscillatorJavaScriptNode: false,
	Oscillator: false, CallbackGenerator: false, SineWave: false,
	FrequencyCentrer: false, OscillatorAdder: false,
	FrequencyModulationGenerator: false, EnvelopeGenerator: false,
	ADSRWave: false */
(function () {
	"use strict";

	var AC = webkitAudioContext,
		context = new AC(),
		playButton = document.getElementsByName("play")[0],
		stopButton = document.getElementsByName("stop")[0],
		oscillatorNode,

		stop = function () {
			oscillatorNode.disconnect();
		},

		play = function () {
			if (oscillatorNode) {
				stop();
			}
			var	carrierFrequency,
				carrierAmplitude,
				modulatorFrequency,
				modulationIndex;

			carrierFrequency = 220;
			carrierAmplitude = new EnvelopeGenerator({
				waveTable: new ADSRWave({
					attackTime: 5,
					decayTime: 0,
					sustainLevel: 1,
					sustainTime: 0,
					releaseTime: 5
				}),
				duration: 30,
				sampleRate: context.sampleRate,
				amplitude: 50
			});
			modulatorFrequency = 110;
			modulationIndex = new EnvelopeGenerator({
				waveTable: new ADSRWave({
					attackTime: 10,
					decayTime: 0,
					sustainLevel: 1,
					sustainTime: 0,
					releaseTime: 0
				}),
				duration: 30,
				sampleRate: context.sampleRate,
				amplitude: 1
			});

			oscillatorNode = new OscillatorJavaScriptNode({
				context: context,
				oscillator: new FrequencyModulationGenerator({
					carrierFrequency: carrierFrequency,
					carrierAmplitude: carrierAmplitude,
					modulatorFrequency: modulatorFrequency,
					modulationIndex: modulationIndex,
					sampleRate: context.sampleRate
				})
			});
			oscillatorNode.connect(context.destination);
		};

	playButton.addEventListener("click", play);
	stopButton.addEventListener("click", stop);
}());