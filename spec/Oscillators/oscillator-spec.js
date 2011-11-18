/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	Oscillator: false */
describe("Oscillator", function () {
	"use strict";
	var waveTable,
		frequency,
		sampleRate,
		amplitude,
		waveTableSize,
		oscillator;

	describe("fixed frequency and amplitude", function () {
		beforeEach(function () {
			waveTable = { 
				getValue: function () {
					return 0.5;
				},
				getTableSize: function () {
					return waveTableSize;
				}
			};
			frequency = 440;
			sampleRate = 44800;
			amplitude = 0.75;
			waveTableSize = 1000;
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
				expectedIndex = frequency * waveTableSize / sampleRate;
			oscillator.next();
			oscillator.next();
			expect(spy.mostRecentCall.args[0]).toEqual(expectedIndex);
		});

		it("should return the value from the wave table multiplied by the amplitude", function () {
			var result = oscillator.next();
			expect(result).toEqual(0.375);
		});
	});
});