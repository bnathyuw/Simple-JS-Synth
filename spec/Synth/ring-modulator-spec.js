/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	RingModulator: false, Oscillator: false, SineWave: false */
describe("RingModulator", function () {
	"use strict";

	var carrierFrequency,
		modulatorFrequency,
		sampleRate,
		ringModulator,
		carrierReference,
		modulatorReference;

	beforeEach(function () {
		carrierFrequency = 0.3;

		modulatorFrequency = 660;

		sampleRate = 44800;

		ringModulator = new RingModulator({
			carrierFrequency: carrierFrequency,
			modulatorFrequency: modulatorFrequency,
			sampleRate: sampleRate
		});

		carrierReference = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: carrierFrequency,
			sampleRate: sampleRate
		});

		modulatorReference = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: modulatorFrequency,
			sampleRate: sampleRate
		});
	});

	it("should return the value from carrier multiplied by the correct value from the modulator", function () {
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
	});
});
