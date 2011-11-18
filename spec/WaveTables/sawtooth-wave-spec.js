/*global describe: false, it: false, expect: false, SawtoothWave: false */

describe("SawtoothWave", function () {
	"use strict";

	var sawtoothWave = new SawtoothWave();

	it("should return 0 at position 0", function () {
		var result = sawtoothWave.getValue(0);
		expect(result.toFixed(4)).toEqual("0.0000");
	});

	it("should return 0.5 at position 250", function () {
		var result = sawtoothWave.getValue(250);
		expect(result.toFixed(4)).toEqual("0.5000");
	});

	it("should return -1 at position 500", function () {
		var result = sawtoothWave.getValue(500);
		expect(result.toFixed(4)).toEqual("-1.0000");
	});

	it("should return -0.5 at position 750", function () {
		var result = sawtoothWave.getValue(750);
		expect(result.toFixed(4)).toEqual("-0.5000");
	});
});
