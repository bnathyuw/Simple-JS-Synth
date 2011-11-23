/*global AudioContext: false, webkitAudioContext: false, document: false,
	SineWave: false, Oscillator: false, ADSRWave: false, EnvelopeWave: false,
	EnvelopeGenerator: false, OscillatorJavaScriptNode: false */

(function () {
	"use strict";
	var AC = webkitAudioContext,
		context = new AC(),
		x = 0,
		sampleRate = context.sampleRate,
		amplitudeWave = new ADSRWave({
			attackTime: 1,
			decayTime: 1,
			sustainLevel: 0.5,
			sustainTime: 1,
			releaseTime: 1
		}),
		frequencyWave = new SineWave(),
		oscillatorWave = new SineWave();

	document.getElementById("play").onclick = function () {
		var amplitude = new EnvelopeGenerator({
				duration: 5,
				sampleRate: sampleRate,
				waveTable: amplitudeWave,
				amplitude: 1
			}),
			frequency = new FrequencyCentrer({
				envelope: new Oscillator({
					frequency: 8,
					sampleRate: sampleRate,
					waveTable: frequencyWave,
					amplitude: 5
				}),
				frequency: 440
			}),
			oscillator = new Oscillator({
				frequency: frequency,
				sampleRate: sampleRate,
				waveTable: oscillatorWave,
				amplitude: amplitude
			}),

			oscillatorNode = new OscillatorJavaScriptNode({
				context: context,
				oscillator: oscillator
			});

		oscillatorNode.connect(context.destination);
	};
}());