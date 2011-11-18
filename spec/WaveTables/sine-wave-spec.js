/*global describe: false, it: false, expect: false, SineWave: false */

describe("SineWave", function () {
	"use strict";

	var sineWave = new SineWave();

	it("should return 0 at position 0", function () {
		var result = sineWave.getValue(0);
		expect(result.toFixed(4)).toEqual("0.0000");
	});

	it("should return 1 at position 0.25", function () {
		var result = sineWave.getValue(0.25);
		expect(result.toFixed(4)).toEqual("1.0000");
	});

	it("should return 0 at position 0.5", function () {
		var result = sineWave.getValue(0.5);
		expect(result.toFixed(4)).toEqual("0.0000");
	});

	it("should return -1 at position 0.75", function () {
		var result = sineWave.getValue(0.75);
		expect(result.toFixed(4)).toEqual("-1.0000");
	});
});