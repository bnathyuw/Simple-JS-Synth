/*global AudioContext: false, webkitAudioContext: false, document: false,
	SineWave: false, Oscillator: false, ADSRWave: false, EnvelopeWave: false,
	TriangleWave: false,
	EnvelopeGenerator: false, OscillatorJavaScriptNode: false, FrequencyCentrer: false,
	OscillatorAdder: false */

(function () {
	"use strict";
	var AC = webkitAudioContext,
		context = new AC(),
		sampleRate = context.sampleRate,
		amplitudeWave = new ADSRWave({
			attackTime: 0.2,
			decayTime: 0.2,
			sustainLevel: 0.5,
			sustainTime: 1,
			releaseTime: 0.2
		}),
		frequencyWave = new SineWave(),
		oscillatorWave = new SineWave();

	document.getElementById("play").onclick = function () {
		var amplitude,
			frequency,
			compoundWave,
			oscillators = [],
			oscillatorNode,
			simpleWave,
			i;

		for (i = 0; i < 20; i = i + 1) {
			frequency = new FrequencyCentrer({
				wave: new Oscillator({
					frequency: 8,
					sampleRate: sampleRate,
					waveTable: frequencyWave,
					amplitude: 5
				}),
				frequency: 440 * (2 * i + 1)
			});

			amplitude = new EnvelopeGenerator({
				duration: 5,
				sampleRate: sampleRate,
				waveTable: amplitudeWave,
				amplitude: 1
			});

			oscillators.push(new Oscillator({
				frequency: frequency,
				sampleRate: sampleRate,
				waveTable: oscillatorWave,
				amplitude: amplitude
			}));
		}

		compoundWave = new OscillatorAdder({
			oscillators: oscillators
		});

		simpleWave = new Oscillator({
			frequency: 440,
			amplitude: 1,
			waveTable: new TriangleWave(),
			sampleRate: context.sampleRate
		});

		oscillatorNode = new OscillatorJavaScriptNode({
			context: context,
			oscillator: simpleWave
		});

		oscillatorNode.connect(context.destination);
	};
}());
