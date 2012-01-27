/*global Oscillator: false, SineWave: false */
var RingModulator = function RingModulator(spec) {
	"use strict";

	if (!this instanceof RingModulator) {
		return new RingModulator(spec);
	}

	var carrier = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: spec.carrierFrequency,
			sampleRate: spec.sampleRate
		}),

		modulator = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: spec.modulatorFrequency,
			sampleRate: spec.sampleRate
		}),

		next = function () {
			return carrier.next() * modulator.next();
		};

	this.next = next;
};
