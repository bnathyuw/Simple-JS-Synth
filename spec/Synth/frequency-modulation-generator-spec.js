/*global describe: false, beforeEach: false, it: false, expect: false,
	FrequencyModulationGenerator: false */

describe("FrequencyModulationGenerator", function () {
	"use strict";

	var frequencyModulationGenerator;

	describe("with no modulation", function () {

		beforeEach(function () {
			frequencyModulationGenerator = new FrequencyModulationGenerator({
				carrierFrequency: 440,
				carrierAmplitude: 1,
				modulatorFrequency: 440,
				modulationIndex: 0,
				sampleRate: 44800
			});
		});

		it("should return something", function () {
			var next = frequencyModulationGenerator.next();

			expect(next).toEqual(0);
		});

	});
});