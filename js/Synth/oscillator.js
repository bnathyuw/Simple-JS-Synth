var Oscillator = function Oscillator(spec) {
	"use strict";
	var currentIndex = 0,
		isFunction = function (object) {
			return !!(object && object.constructor && object.call && object.apply);
		},
		waveTable = spec.waveTable,
		frequency = spec.frequency.next ? spec.frequency : {
			next: isFunction(spec.frequency) ? spec.frequency : function () {
				return spec.frequency;
			}
		},
		context = spec.context,
		sampleRate = context.sampleRate,
		amplitude = spec.amplitude.next ? spec.amplitude : {
			next: isFunction(spec.amplitude) ? spec.amplitude : function () {
				return spec.amplitude;
			}
		},
		next = function () {
			var returnValue = waveTable.getValue(currentIndex);
			currentIndex = currentIndex + frequency.next() / sampleRate;
			return returnValue * amplitude.next();
		};

	this.next = next;
};

SynthAudioContext.prototype.createOscillator = function (spec) {
	spec.context = this;
	return new Oscillator(spec);	
}

SynthAudioContext.prototype.createOscillatorNode = function (spec) {
	return this.createOscillatorJavaScriptNode({
		oscillator: this.createOscillator(spec)
	});
}