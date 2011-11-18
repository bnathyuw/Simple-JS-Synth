/*global describe: false, it: false, expect: false, SquareWave: false */

describe("SquareWave", function () {
	"use strict";

	var squareWave = new SquareWave();

	it("should return 1 at position 0", function () {
		var result = squareWave.getValue(0);
		expect(result.toFixed(4)).toEqual("1.0000");
	});

	it("should return 1 at position 250", function () {
		var result = squareWave.getValue(250);
		expect(result.toFixed(4)).toEqual("1.0000");
	});

	it("should return -1 at position 500", function () {
		var result = squareWave.getValue(500);
		expect(result.toFixed(4)).toEqual("-1.0000");
	});

	it("should return -1 at position 750", function () {
		var result = squareWave.getValue(750);
		expect(result.toFixed(4)).toEqual("-1.0000");
	});
});
