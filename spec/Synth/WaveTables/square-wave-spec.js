/*global describe: false, it: false, expect: false, SquareWave: false,
	SynthAudioContext: false */

describe("SquareWave", function () {
	"use strict";

	var squareWave = new SynthAudioContext().squareWave;

	it("should return 1 at position 0", function () {
		var result = squareWave(0);
		expect(result.toFixed(4)).toEqual("1.0000");
	});

	it("should return 1 at position 0.25", function () {
		var result = squareWave(0.25);
		expect(result.toFixed(4)).toEqual("1.0000");
	});

	it("should return -1 at position 0.5", function () {
		var result = squareWave(0.5);
		expect(result.toFixed(4)).toEqual("-1.0000");
	});

	it("should return -1 at position 0.75", function () {
		var result = squareWave(0.75);
		expect(result.toFixed(4)).toEqual("-1.0000");
	});
});
