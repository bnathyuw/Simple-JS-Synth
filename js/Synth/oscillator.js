/*global SynthAudioContext: false */
var Oscillator = function Oscillator(spec) {
	"use strict";
	var currentIndex = 0,
		waveTable = spec.waveTable,
		context = spec.context,
		frequency = context.createGenerator(spec.frequency),
		sampleRate = context.sampleRate,
		amplitude = context.createGenerator(spec.amplitude),
		next = function () {
			var returnValue = waveTable(currentIndex);
			currentIndex = currentIndex + frequency.next() / sampleRate;
			return returnValue * amplitude.next();
		};

	this.next = next;
};

SynthAudioContext.prototype.createOscillator = function (spec) {
	"use strict";
	spec.context = this;
	return new Oscillator(spec);
};

SynthAudioContext.prototype.createOscillatorNode = function (spec) {
	"use strict";
	return this.createOscillatorJavaScriptNode({
		oscillator: this.createOscillator(spec)
	});
};