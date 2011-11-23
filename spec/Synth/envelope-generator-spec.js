/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	EnvelopeGenerator: false */
describe("EnvelopeGenerator", function () {
	"use strict";
	var waveTable,
		duration,
		sampleRate,
		amplitude,
		oscillator;

	describe("fixed frequency and amplitude", function () {
		beforeEach(function () {
			waveTable = {
				getValue: function () {
					return 0.5;
				}
			};
			duration = 2;
			sampleRate = 2;
			amplitude = 0.75;
			oscillator = new EnvelopeGenerator({
				waveTable: waveTable,
				duration: duration,
				sampleRate: sampleRate,
				amplitude: amplitude
			});
		});

		it("should retrieve the first value from the wave table", function () {
			var spy = spyOn(waveTable, "getValue");
			oscillator.next();
			expect(spy).toHaveBeenCalledWith(0);
		});

		it("should retrieve the second value with the correct index", function () {
			var spy = spyOn(waveTable, "getValue"),
				expectedIndex = 1 / (duration * sampleRate);
			oscillator.next();
			oscillator.next();
			expect(spy.mostRecentCall.args[0]).toEqual(expectedIndex);
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