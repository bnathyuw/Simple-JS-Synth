/*global Oscillator: false, SineWave: false, SynthAudioContext: false */
var RingModulator = function RingModulator(spec) {
	"use strict";

	if (!this instanceof RingModulator) {
		return new RingModulator(spec);
	}

	var context = spec.context,

		carrier = context.createOscillator({
			amplitude: 1,
			waveTable: context.sineWave,
			frequency: spec.carrierFrequency
		}),

		modulator = context.createOscillator({
			amplitude: 1,
			waveTable: context.sineWave,
			frequency: spec.modulatorFrequency
		}),

		next = function () {
			return carrier.next() * modulator.next();
		};

	this.next = next;
};

SynthAudioContext.prototype.createRingModulator = function (spec) {
	"use strict";
	spec.context = this;
	return new RingModulator(spec);
}

SynthAudioContext.prototype.createRingModulatorNode = function (spec) {
	"use strict";
	return this.createOscillatorJavaScriptNode({
		oscillator: this.createRingModulator(spec)
	});	
}
