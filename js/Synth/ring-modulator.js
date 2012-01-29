/*global Oscillator: false, SineWave: false */
var RingModulator = function RingModulator(spec) {
	"use strict";

	if (!this instanceof RingModulator) {
		return new RingModulator(spec);
	}

	var context = spec.context,

		carrier = context.createOscillator({
			amplitude: 1,
			waveTable: context.createSineWave(),
			frequency: spec.carrierFrequency
		}),

		modulator = context.createOscillator({
			amplitude: 1,
			waveTable: context.createSineWave(),
			frequency: spec.modulatorFrequency
		}),

		next = function () {
			return carrier.next() * modulator.next();
		};

	this.next = next;
};

SynthAudioContext.prototype.createRingModulator = function(spec) {
	spec.context = this;
	return new RingModulator(spec);
}

SynthAudioContext.prototype.createRingModulatorNode = function(spec) {
	return this.createOscillatorJavaScriptNode({
		oscillator: this.createRingModulator(spec)
	});	
}
