var OscillatorAdder = function OscillatorAdder(spec) {
	"use strict";
	var oscillators = spec.oscillators,
		oscillatorCount = oscillators.length,
		next = function () {
			var i = 0,
				value = 0;

			for (i = 0; i < oscillatorCount; i = i + 1) {
				value = value + oscillators[i].next();
			}

			return value;
		};

	this.next = next;
};

SynthAudioContext.prototype.createOscillatorAdder = function(spec) {
	return new OscillatorAdder(spec);
}