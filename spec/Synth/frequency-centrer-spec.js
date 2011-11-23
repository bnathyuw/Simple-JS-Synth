/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	FrequencyCentrer: false */
describe("FrequencyCentrer", function () {
	"use strict";
	var frequency = 440,
		wave,
		frequencyCentrer;

	beforeEach(function () {
		var i = 0;
		wave = {
			next: function () {
				i = i + 0.1;
				return i;
			}
		};
		frequencyCentrer = new FrequencyCentrer({
			wave: wave,
			frequency: frequency
		});
	});

	describe("next", function () {
		it("should retrieve the first value from the wave", function () {
			var spy = spyOn(wave, "next").andCallThrough();
			frequencyCentrer.next();
			expect(spy).toHaveBeenCalled();
		});

		it("should add the input frequency to the first return value", function () {
			var result = frequencyCentrer.next();
			expect(result).toEqual(440.1);
		});
	});
});