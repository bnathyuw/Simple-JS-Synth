/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	Oscillator: false, jasmine: false */
describe("Oscillator", function () {
	"use strict";
	var frequency,
		sampleRate,
		amplitude,
		oscillator,
		waveTable;

	describe("fixed frequency and amplitude", function () {
		beforeEach(function () {
			frequency = 440;
			sampleRate = 44800;
			amplitude = 0.75;
			waveTable = jasmine.createSpy().andReturn(0.5);
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
			oscillator.next();
			expect(waveTable).toHaveBeenCalledWith(0);
		});

		it("should retrieve the second value with the correct index", function () {
			var expectedIndex = frequency  / sampleRate;
			oscillator.next();
			oscillator.next();
			expect(waveTable.mostRecentCall.args[0]).toEqual(expectedIndex);
		});

		it("should return the value from the wave table multiplied by the amplitude", function () {
			var result = oscillator.next();
			expect(result).toEqual(0.375);
		});
	});

	describe("env gen provides amplitude", function () {
		beforeEach(function () {
			amplitude = {
				next: function () {
					return 0.5;
				}
			};
			frequency = 440;
			sampleRate = 44800;
			oscillator = new Oscillator({
				waveTable: function () {
					return 0.4;
				},
				frequency: frequency,
				context: {
					sampleRate: sampleRate
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
			amplitude = 1;
			frequency = {
				next: function () {
					return 448;
				}
			};
			waveTable = jasmine.createSpy().andReturn(0.4);
			sampleRate = 44800;
			oscillator = new Oscillator({
				waveTable: waveTable,
				frequency: frequency,
				context: {
					sampleRate: sampleRate
				},
				amplitude: amplitude
			});
		});

		it("should call frequency.next", function () {
			oscillator.next();
			expect(waveTable).toHaveBeenCalled();
		});

		it("should use the value from the frequency generator to look up the wave value", function () {
			oscillator.next();
			oscillator.next();
			expect(waveTable.mostRecentCall.args[0]).toEqual(0.01);
		});

	});

});