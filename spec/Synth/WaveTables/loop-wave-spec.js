/*global describe: false, beforeEach: false, it: false, expect: false,
	LoopWave: false */
describe("LoopWave", function () {
	"use strict";

	var table = [0, 1],
		waveTableBase;

	beforeEach(function () {
		waveTableBase = new LoopWave(table);
	});

	it("should look up the value from the supplied table", function () {
		var result = waveTableBase.getValue(0.5);
		expect(result).toEqual(table[1]);
	});

	it("should return a value for an out-of-range index", function () {
		var result = waveTableBase.getValue(1);
		expect(result).toEqual(0);
	});

	it("should return a value for a fractional index", function () {
		var result = waveTableBase.getValue(0.25);
		expect(result).toEqual(0.5);
	});

	it("should return a value for another fractional index", function () {
		var result = waveTableBase.getValue(0.3715);
		expect(result).toEqual(0.743);
	});
});