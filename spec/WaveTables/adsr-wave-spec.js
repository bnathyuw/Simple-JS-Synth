/*global describe: false, it: false, expect: false, ADSRWave: false */

describe("ADSRWave", function () {
	"use strict";

	var attackTime = 2,
		decayTime = 2,
		sustainLevel = 0.75,
		sustainTime = 3,
		releaseTime = 3,
		adsrWave = new ADSRWave({
			attackTime: attackTime,
			decayTime: decayTime,
			sustainLevel: sustainLevel,
			sustainTime: sustainTime,
			releaseTime: releaseTime
		}),
		expectedValues = [0, 0.5, 1, 0.875, 0.75, 0.75, 0.75, 0.75, 0.5, 0.25],
		i = 0,
		length;

	it("should return correct value for index 0", function () {
		var result = adsrWave.getValue(0);
		expect(result).toEqual(expectedValues[0]);
	});

	it("should return correct value for index 0.1", function () {
		var result = adsrWave.getValue(0.1);
		expect(result).toEqual(expectedValues[1]);
	});

	it("should return correct value for index 0.2", function () {
		var result = adsrWave.getValue(0.2);
		expect(result).toEqual(expectedValues[2]);
	});

	it("should return correct value for index 0.3", function () {
		var result = adsrWave.getValue(0.3);
		expect(result).toEqual(expectedValues[3]);
	});

	it("should return correct value for index 0.4", function () {
		var result = adsrWave.getValue(0.4);
		expect(result).toEqual(expectedValues[4]);
	});

	it("should return correct value for index 0.5", function () {
		var result = adsrWave.getValue(0.5);
		expect(result).toEqual(expectedValues[5]);
	});

	it("should return correct value for index 0.6", function () {
		var result = adsrWave.getValue(0.6);
		expect(result).toEqual(expectedValues[6]);
	});

	it("should return correct value for index 0.7", function () {
		var result = adsrWave.getValue(0.7);
		expect(result).toEqual(expectedValues[7]);
	});

	it("should return correct value for index 0.8", function () {
		var result = adsrWave.getValue(0.8);
		expect(result).toEqual(expectedValues[8]);
	});

	it("should return correct value for index 0.9", function () {
		var result = adsrWave.getValue(0.9);
		expect(result).toEqual(expectedValues[9]);
	});
});
