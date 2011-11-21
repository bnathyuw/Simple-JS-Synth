/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	FrequencyCentrer: false */
describe("FrequencyCentrer", function () {
	"use strict";
	var frequency = 440,
		envelope,
		frequencyCentrer;

	beforeEach(function () {
		var i = 0;
		envelope = {
			next: function () {
				i = i + 0.1;
				return i;
			}
		};
		frequencyCentrer = new FrequencyCentrer({
			envelope: envelope,
			frequency: frequency
		});
	});

	describe("next", function () {
		it("should retrieve the first value from the envelope", function () {
			var spy = spyOn(envelope, "next").andCallThrough();
			frequencyCentrer.next();
			expect(spy).toHaveBeenCalled();
		});

		it("should add the input frequency to the first return value", function () {
			var result = frequencyCentrer.next();
			expect(result).toEqual(440.1);
		});
	});
});