/*global AudioContext: false, webkitAudioContext: false, document: false,

	SineWave: false, Oscillator: false */

(function () {
	"use strict";
	var AC = webkitAudioContext,
		context = new AC(),
		x = 0,
		frequency = 440,
		sampleRate = context.sampleRate

	document.getElementById("play").onclick = function () {
		var jsNode = context.createJavaScriptNode(2048, 1, 1),
			sineWave = new SineWave(),
			amplitude = new EnvelopeGenerator({
				duration: 5,
				sampleRate: sampleRate,
				waveTable: new ADSRWave({
					attackTime: 1, 
					decayTime: 1,
					sustainLevel: 0.5,
					sustainTime: 1,
					releaseTime: 1
				}),
				amplitude: 1
			}),
			oscillator = new Oscillator({
				frequency: frequency,
				sampleRate: sampleRate,
				waveTable: sineWave,
				amplitude: amplitude
			}),

			process = function (e) {
				var data = e.outputBuffer.getChannelData(0),
					i;
				for (i = 0; i < data.length; i = i + 1) {
					data[i] = oscillator.next();
				}
			};

		jsNode.onaudioprocess = process;
		jsNode.connect(context.destination);
	};
}());