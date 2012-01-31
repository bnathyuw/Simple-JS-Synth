/*jslint browser: true */
/*global webkitAudioContext: false, OscillatorJavaScriptNode: false,
	Oscillator: false, CallbackGenerator: false, SineWave: false,
	FrequencyCentrer: false, OscillatorAdder: false,
	FrequencyModulationGenerator: false, EnvelopeGenerator: false,
	ADSRWave: false */
(function () {
	"use strict";

	var context = new SynthAudioContext(),
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
			carrierAmplitude = context.createEnvelopeGenerator({
				waveTable: context.createADSRWave({
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
			modulationIndex = context.createEnvelopeGenerator({
				waveTable: context.createADSRWave({
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

			oscillatorNode = context.createOscillatorJavaScriptNode({
				context: context,
				oscillator: context.createFrequencyModulationGenerator({
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