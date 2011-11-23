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
			attackTime: 0.2,
			decayTime: 0.2,
			sustainLevel: 0.5,
			sustainTime: 1,
			releaseTime: 0.2
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
			compoundWave = new OscillatorAdder({
				oscillators: [
					new Oscillator({
						frequency: new FrequencyCentrer({
							wave: new Oscillator({
								frequency: 8,
								sampleRate: sampleRate,
								waveTable: frequencyWave,
								amplitude: 5
							}),
							frequency: 440
						}),
						sampleRate: sampleRate,
						waveTable: oscillatorWave,
						amplitude: amplitude
					}),
					new Oscillator({
						frequency: new FrequencyCentrer({
							wave: new Oscillator({
								frequency: 8,
								sampleRate: sampleRate,
								waveTable: frequencyWave,
								amplitude: 5
							}),
							frequency: 440 * 1.5
						}),
						sampleRate: sampleRate,
						waveTable: oscillatorWave,
						amplitude: amplitude
					}),
					new Oscillator({
						frequency: new FrequencyCentrer({
							wave: new Oscillator({
								frequency: 8,
								sampleRate: sampleRate,
								waveTable: frequencyWave,
								amplitude: 5
							}),
							frequency: 440 * 1.5 * 1.5
						}),
						sampleRate: sampleRate,
						waveTable: oscillatorWave,
						amplitude: amplitude
					})
				]
			}),oscillatorNode = new OscillatorJavaScriptNode({
				context: context,
				oscillator: compoundWave
			});

		oscillatorNode.connect(context.destination);
	};
}());