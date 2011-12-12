/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	RingModulator: false, Oscillator: false, SineWave: false */
describe("RingModulator", function () {
	"use strict";

	var carrier,
		modulatorFrequency,
		sampleRate,
		ringModulator,
		modulatorReference;

	beforeEach(function () {
		carrier = {
			next: function () {
				return 0.3;
			}
		};

		modulatorFrequency = 660;

		sampleRate = 44800;

		ringModulator = new RingModulator({
			carrier: carrier,
			frequency: modulatorFrequency,
			sampleRate: sampleRate
		});

		modulatorReference = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: modulatorFrequency,
			sampleRate: sampleRate
		});
	});

	it("should call carrier.next", function () {
		var spy = spyOn(carrier, "next").andCallThrough();

		ringModulator.next();

		expect(spy).toHaveBeenCalled();
	});

	it("should return the value from carrier multiplied by the correct value from the modulator", function () {
		expect(ringModulator.next()).toEqual(0.3 * modulatorReference.next());
		expect(ringModulator.next()).toEqual(0.3 * modulatorReference.next());
		expect(ringModulator.next()).toEqual(0.3 * modulatorReference.next());
		expect(ringModulator.next()).toEqual(0.3 * modulatorReference.next());
	});
});
