/*global AudioContext: false, webkitAudioContext: false, document: false,
	SineWave: false, Oscillator: false */

(function () {
	"use strict";
	var AC = webkitAudioContext,
		context = new AC(),
		jsNode = context.createJavaScriptNode(2048, 1, 1),
		sineWave = new SineWave(),
		x = 0,
		frequency = 440,
		sampleRate = context.sampleRate,
		amplitude = 1,
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

	document.getElementById("play").onclick = function () {
		jsNode.connect(context.destination);
	};

	document.getElementById("pause").onclick = function () {
		jsNode.disconnect();
	};
}());