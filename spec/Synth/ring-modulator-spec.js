/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	RingModulator: false, Oscillator: false, SineWave: false */
describe("RingModulator", function () {
	"use strict";

	var carrierFrequency,
		modulatorFrequency,
		sampleRate,
		ringModulator,
		carrierReference,
		modulatorReference,
		context;

	beforeEach(function () {
		carrierFrequency = 0.3;

		modulatorFrequency = 660;

		sampleRate = 44800;
		
		context = {
			sampleRate: sampleRate,
			createOscillator: function(spec) {
				spec.context = context;
				return new Oscillator(spec);
			}
		}

		ringModulator = new RingModulator({
			carrierFrequency: carrierFrequency,
			modulatorFrequency: modulatorFrequency,
			context: context
		});

		carrierReference = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: carrierFrequency,
			context: context
		});

		modulatorReference = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: modulatorFrequency,
			context: context
		});
	});

	it("should return the value from carrier multiplied by the correct value from the modulator", function () {
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
		expect(ringModulator.next()).toEqual(modulatorReference.next() * carrierReference.next());
	});
});
