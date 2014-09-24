/*global SynthAudioContext: false */
var OscillatorJavaScriptNode = function OscillatorJavaScriptNode(spec) {
	"use strict";
	var context = spec.context,
		oscillator = spec.oscillator,
		jsNode = context.createScriptProcessor(2048, 0, 1),
		disconnect = function () {
			jsNode.disconnect();
		},
		process = function (e) {
			var data = e.outputBuffer.getChannelData(0),
				i;
			for (i = 0; i < data.length; i = i + 1) {
				try {
					data[i] = oscillator.next();
				} catch (exception) {
					if (exception.name === "EnvelopeComplete") {
						jsNode.onaudioprocess = disconnect;
					} else {
						throw exception;
					}
				}
			}
		};

	jsNode.onaudioprocess = process;

	return jsNode;
};

SynthAudioContext.prototype.createOscillatorJavaScriptNode = function (spec) {
	"use strict";
	spec.context = this;
	return new OscillatorJavaScriptNode(spec);
};