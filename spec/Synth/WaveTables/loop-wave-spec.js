/*global describe: false, beforeEach: false, it: false, expect: false,
	LoopWave: false */
describe("LoopWave", function () {
	"use strict";

	var table = [0, 1],
		loopWave;

	beforeEach(function () {
		loopWave = new SynthAudioContext().createLoopWave(table);
	});

	it("should look up the value from the supplied table", function () {
		var result = loopWave(0.5);
		expect(result).toEqual(table[1]);
	});

	it("should return a value for an out-of-range index", function () {
		var result = loopWave(1);
		expect(result).toEqual(0);
	});

	it("should return a value for a fractional index", function () {
		var result = loopWave(0.25);
		expect(result).toEqual(0.5);
	});

	it("should return a value for another fractional index", function () {
		var result = loopWave(0.3715);
		expect(result).toEqual(0.743);
	});
});