/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	EnvelopeGenerator: false, jasmine: false */
describe("EnvelopeGenerator", function () {
	"use strict";
	var waveTable,
		duration,
		sampleRate,
		amplitude,
		oscillator,
		context,
		spec;

	describe("fixed frequency and amplitude", function () {
		beforeEach(function () {
			duration = 2;
			sampleRate = 2;
			amplitude = 0.75;
			context = {
				sampleRate: sampleRate
			};
			waveTable = jasmine.createSpy().andReturn(0.5);
			spec = {
				waveTable: waveTable,
				duration: duration,
				amplitude: amplitude,
				context: context
			};
			oscillator = new EnvelopeGenerator(spec);
		});

		it("should retrieve the first value from the wave table", function () {
			oscillator.next();
			expect(waveTable).toHaveBeenCalledWith(0);
		});

		it("should retrieve the second value with the correct index", function () {
			var expectedIndex = 1 / (duration * sampleRate);
			oscillator.next();
			oscillator.next();
			expect(waveTable.mostRecentCall.args[0]).toEqual(expectedIndex);
		});

		it("should return the value from the wave table multiplied by the amplitude", function () {
			var result = oscillator.next();
			expect(result).toEqual(0.375);
		});

		it("should throw envelope complete once the duration has passed", function () {
			var i, limit;
			for (i = 0, limit = sampleRate * duration; i < limit; i = i + 1) {
				expect(oscillator.next()).not.toEqual(0);
			}
			expect(function () {
				oscillator.next();
			}).toThrow({
				name: "EnvelopeComplete"
			});
		});
	});
});