/*global Oscillator: false, SineWave: false,
	FrequencyCentrer: false */
var AmplitudeModulator = function AmplitudeModulator(spec) {
	"use strict";

	if (!this instanceof AmplitudeModulator) {
		return new AmplitudeModulator(spec);
	}

	var carrier = spec.carrier,

		modulator = new FrequencyCentrer({
			wave: new Oscillator({
				amplitude: 0.5,
				waveTable: new SineWave(),
				frequency: spec.frequency,
				sampleRate: spec.sampleRate
			}),
			frequency: 0.5
		}),

		next = function () {
			return carrier.next() * modulator.next();
		};

	this.next = next;
};
