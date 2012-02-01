/*global describe: false, beforeEach: false, it: false, expect: false,
	FrequencyModulationGenerator: false, Oscillator: false, OscillatorAdder: false,
	SynthAudioContext: false */

describe("FrequencyModulationGenerator", function () {
	"use strict";

	var frequencyModulationGenerator,
		context;

	describe("with no modulation", function () {

		beforeEach(function () {
			context = {
				sampleRate: 44800,
				createOscillator: function (spec) {
					spec.context = context;
					return new Oscillator(spec);
				},
				sineWave: function (index) {
					return index;
				},
				createOscillatorAdder: function (spec) {
					return new OscillatorAdder(spec);
				},
				createGenerator: SynthAudioContext.prototype.createGenerator
			};
			frequencyModulationGenerator = new FrequencyModulationGenerator({
				carrierFrequency: 440,
				carrierAmplitude: 1,
				modulatorFrequency: 440,
				modulationIndex: 0,
				context: context
			});
		});

		it("should return something", function () {
			var next = frequencyModulationGenerator.next();

			expect(next).toEqual(0);
		});

	});
});