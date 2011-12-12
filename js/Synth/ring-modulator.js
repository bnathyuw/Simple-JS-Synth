/*global Oscillator: false, SineWave: false */
var RingModulator = function RingModulator(spec) {
	"use strict";

	if (!this instanceof RingModulator) {
		return new RingModulator(spec);
	}

	var carrier = spec.carrier,

		modulator = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: spec.frequency,
			sampleRate: spec.sampleRate
		}),

		next = function () {
			return carrier.next() * modulator.next();
		};

	this.next = next;
};