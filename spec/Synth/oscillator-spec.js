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
				context: {
					sampleRate: sampleRate
				},
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

	describe("env gen provides amplitude", function () {
		beforeEach(function () {
			waveTable = {
				getValue: function () {
					return 0.4;
				}
			};
			amplitude = {
				next: function () {
					return 0.5;
				}
			};
			frequency = 440;
			sampleRate = 44800;
			oscillator = new Oscillator({
				waveTable: waveTable,
				frequency: frequency,
				context: {
					sampleRate: sampleRate,
				},
				amplitude: amplitude
			});
		});

		it("should call amplitude.next", function () {
			var spy = spyOn(amplitude, "next");
			oscillator.next();
			expect(spy).toHaveBeenCalled();
		});

		it("should return the value from the wave table multiplied by value returned for the amplitude", function () {
			var result = oscillator.next();
			expect(result).toEqual(0.2);
		});
	});

	describe("env gen provides frequency", function () {
		beforeEach(function () {
			waveTable = {
				getValue: function () {
					return 0.4;
				}
			};
			amplitude = 1;
			frequency = {
				next: function () {
					return 448;
				}
			};
			sampleRate = 44800;
			oscillator = new Oscillator({
				waveTable: waveTable,
				frequency: frequency,
				context: {
					sampleRate: sampleRate,
				},
				amplitude: amplitude
			});
		});

		it("should call frequency.next", function () {
			var spy = spyOn(frequency, "next");
			oscillator.next();
			expect(spy).toHaveBeenCalled();
		});

		it("should use the value from the frequency generator to look up the wave value", function () {
			var spy = spyOn(waveTable, "getValue");
			oscillator.next();
			oscillator.next();
			expect(spy.mostRecentCall.args[0]).toEqual(0.01);
		});

	});

});