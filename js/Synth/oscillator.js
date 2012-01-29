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
		sampleRate = spec.sampleRate,
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
	spec.sampleRate = this.sampleRate;
	return new Oscillator(spec);	
}