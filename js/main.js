/*global webkitAudioContext: false */

(function () {
	"use strict";
	var context = new webkitAudioContext(),
		jsNode = context.createJavaScriptNode(2048, 1, 1),
		x = 0,
		sampleRate = context.sampleRate,
		process = function (e) {
			var data = e.outputBuffer.getChannelData(0),
				i;
			for (i = 0; i < data.length; i = i + 1) {
				data[i] = Math.sin(x * 2 * Math.PI * 440 / sampleRate);
				x = x + 1;
			}
		};
	
	jsNode.onaudioprocess = process;
	
	jsNode.connect(context.destination);

}());