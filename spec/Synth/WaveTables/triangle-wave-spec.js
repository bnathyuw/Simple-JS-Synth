/*global describe: false, it: false, expect: false, TriangleWave: false */

describe("TriangleWave", function () {
	"use strict";

	var triangleWave = new SynthAudioContext().triangleWave;

	it("should return 0 at position 0", function () {
		var result = triangleWave(0);
		expect(result.toFixed(4)).toEqual("0.0000");
	});

	it("should return 0.5 at position 0.125", function () {
		var result = triangleWave(0.125);
		expect(result.toFixed(4)).toEqual("0.5000");
	});

	it("should return 1 at position 0.25", function () {
		var result = triangleWave(0.25);
		expect(result.toFixed(4)).toEqual("1.0000");
	});

	it("should return 0.5 at position 0.375", function () {
		var result = triangleWave(0.375);
		expect(result.toFixed(4)).toEqual("0.5000");
	});

	it("should return 0 at position 0.5", function () {
		var result = triangleWave(0.5);
		expect(result.toFixed(4)).toEqual("0.0000");
	});

	it("should return -0.5 at position 0.625", function () {
		var result = triangleWave(0.625);
		expect(result.toFixed(4)).toEqual("-0.5000");
	});

	it("should return -1 at position 0.75", function () {
		var result = triangleWave(0.75);
		expect(result.toFixed(4)).toEqual("-1.0000");
	});

	it("should return -0.5 at position 0.875", function () {
		var result = triangleWave(0.875);
		expect(result.toFixed(4)).toEqual("-0.5000");
	});
});
