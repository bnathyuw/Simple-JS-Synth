/*global describe: false, beforeEach: false, it: false, expect: false,
	WaveTableBase: false */
describe("WaveTableBase", function () {
	"use strict";

	var table = [0, 1],
		waveTableBase;

	beforeEach(function () {
		waveTableBase = new WaveTableBase(table);
	});

	it("should look up the value from the supplied table", function () {
		var result = waveTableBase.getValue(1);
		expect(result).toEqual(table[1]);
	});

	it("should return a value for an out-of-range index", function () {
		var result = waveTableBase.getValue(2);
		expect(result).toEqual(0);
	});

	it("should return a value for a fractional index", function () {
		var result = waveTableBase.getValue(0.5);
		expect(result).toEqual(0.5);
	});
	
	it("should return a value for another fractional index", function () {
		var result = waveTableBase.getValue(0.3715);
		expect(result).toEqual(0.3715);
	});
	
	it("should know its tableSize", function () {
		var size = waveTableBase.getTableSize();
		expect(size).toEqual(table.length);
	});
});