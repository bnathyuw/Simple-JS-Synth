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
		expectedValues = [0, 0.5, 1, 0.875, 0.75, 0.75, 0.75, 0.75, 0.5, 0.25, 0],
		i,
		runTest = function (i) {
			it("should return correct value for index " + i, function () {
				var result = adsrWave.getValue(i / 10);
				expect(result.toFixed(4)).toEqual(expectedValues[i].toFixed(4));
			});
		};

	for (i = 0; i < expectedValues.length; i = i + 1) {
		runTest(i);
	}
});
