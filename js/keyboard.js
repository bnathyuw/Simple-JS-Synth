/*global document: false, alert: false,
	webkitAudioContext: false , ADSRWave: false, EnvelopeGenerator: false, Oscillator: false,
	SineWave: false, OscillatorJavaScriptNode: false, FrequencyModulationGenerator: false,
	SynthAudioContext: false	*/
(function () {
	"use strict";

	var keys,
		i,
		key,
		makeKeyClick,
		pitches,
		a,
		semitone,
		playPitch,
		context;

	context = new SynthAudioContext();

	keys = document.querySelectorAll("#keyboard li");

	playPitch = function (pitch) {
		var ampWave,
			ampEnv,
			node;

		ampWave = context.createADSRWave({
			attackTime: 0.2,
			decayTime: 2,
			sustainLevel: 0.5,
			sustainTime: 1,
			releaseTime: 2
		});

		ampEnv = context.createEnvelopeGenerator({
			waveTable: ampWave,
			duration: 0.5,
			amplitude: 1
		});

		node = context.createFrequencyModulationGeneratorNode({
			carrierFrequency: pitch,
			carrierAmplitude: ampEnv,
			modulatorFrequency: pitch * 2,
			modulationIndex: ampEnv
		});

		node.connect(context.destination);
	};

	pitches = [];

	a = 220;

	semitone = Math.pow(2, 1 / 12);

	for (i = 3; i < 16; i = i + 1) {
		pitches.push(a * Math.pow(semitone, i));
	}

	makeKeyClick = function (i) {
		return function () {
			playPitch(pitches[i]);
		};
	};

	for (i = 0; i < keys.length; i = i + 1) {
		key = keys[i];
		key.onclick = makeKeyClick(i);
	}
}());
