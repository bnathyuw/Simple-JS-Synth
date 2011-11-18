/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	Oscillator: false */
describe("Oscillator", function () {
	"use strict";
	var waveTable,
		frequency,
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
			frequency = 440;
			sampleRate = 44800;
			amplitude = 0.75;
			oscillator = new Oscillator({
				waveTable: waveTable,
				frequency: frequency,
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
				expectedIndex = frequency  / sampleRate;
			oscillator.next();
			oscillator.next();
			expect(spy.mostRecentCall.args[0]).toEqual(expectedIndex);
		});

		it("should return the value from the wave table multiplied by the amplitude", function () {
			var result = oscillator.next();
			expect(result).toEqual(0.375);
		});
	});

	describe("env osc provides amplitude", function () {
		beforeEach(function () {
			var i = 0;
			waveTable = {
				getValue: function () {
					return 0.5;
				}
			};
			amplitude = {
				next: function () {
					var returnValue = i < 10 ? i / 10 : 0;
					i = i + 1;
					return returnValue;
				}
			};
			frequency = 440;
			sampleRate = 44800;
			oscillator = new Oscillator({
				waveTable: waveTable,
				frequency: frequency,
				sampleRate: sampleRate,
				amplitude: amplitude
			});
		});

		it("should call amplitude.next", function () {
			var spy = spyOn(amplitude, "next");
			oscillator.next();
			expect(spy).toHaveBeenCalled();
		});
	});
});