/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	AmplitudeModulator: false, Oscillator: false, SineWave: false */
describe("AmplitudeModulator", function () {
	"use strict";

	var carrier,
		modulatorFrequency,
		sampleRate,
		amplitudeModulator,
		modulatorReference,
		context;

	beforeEach(function () {
		carrier = {
			next: function () {
				return 0.3;
			}
		};

		modulatorFrequency = 660;

		sampleRate = 44800;
		
		context = {
			sampleRate: sampleRate,
			createOscillator: function(spec) {
				spec.context = context;
				return new Oscillator(spec);
			},
			createSineWave: function() {
				return new SineWave();
			},
			createFrequencyCentrer: function(spec) {
				return new FrequencyCentrer(spec);
			}
		};

		amplitudeModulator = new AmplitudeModulator({
			carrier: carrier,
			frequency: modulatorFrequency,
			context: context
		});

		modulatorReference = new Oscillator({
			amplitude: 1,
			waveTable: new SineWave(),
			frequency: modulatorFrequency,
			context: context
		});
	});

	it("should call carrier.next", function () {
		var spy = spyOn(carrier, "next").andCallThrough();

		amplitudeModulator.next();

		expect(spy).toHaveBeenCalled();
	});

	it("should return the value from carrier multiplied by the correct value from the modulator", function () {
		expect(amplitudeModulator.next()).toEqual(0.3 * (modulatorReference.next() / 2 + 0.5));
		expect(amplitudeModulator.next()).toEqual(0.3 * (modulatorReference.next() / 2 + 0.5));
		expect(amplitudeModulator.next()).toEqual(0.3 * (modulatorReference.next() / 2 + 0.5));
		expect(amplitudeModulator.next()).toEqual(0.3 * (modulatorReference.next() / 2 + 0.5));
	});
});