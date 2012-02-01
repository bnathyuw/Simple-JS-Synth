/*global Oscillator: false, OscillatorAdder: false, SineWave: false, SynthAudioContext: false */
/**
  * I haven't called this FrequencyModulator as it doesn’t 
  * modulate an existing signal, but rather creates a new
  * one
  */
var FrequencyModulationGenerator = function FrequencyModulationGenerator(spec) {
	"use strict";

	if (!this instanceof FrequencyModulationGenerator) {
		return new FrequencyModulationGenerator(spec);
	}

	var context = spec.context,
		carrierFrequency = context.createGenerator(spec.carrierFrequency),
		carrierAmplitude = context.createGenerator(spec.carrierAmplitude || 1),
		modulatorFrequency = context.createGenerator(spec.modulatorFrequency),
		modulationIndex = context.createGenerator(spec.modulationIndex),
		modulatorAmplitude = {
			next: function () {
				return modulatorFrequency.next() * modulationIndex.next();
			}
		},
		frequencyOscillator = context.createOscillator({
			frequency: modulatorFrequency,
			amplitude: modulatorAmplitude,
			waveTable: context.sineWave
		}),
		addedFrequencies = context.createOscillatorAdder({
			oscillators: [
				frequencyOscillator,
				carrierFrequency
			]
		}),
		oscillator = context.createOscillator({
			frequency: addedFrequencies,
			amplitude: carrierAmplitude,
			waveTable: context.sineWave
		}),
		next = function () {
			return oscillator.next();
		};

	this.next = next;
};

SynthAudioContext.prototype.createFrequencyModulationGenerator = function (spec) {
	"use strict";
	spec.context = this;
	return new FrequencyModulationGenerator(spec);
};

SynthAudioContext.prototype.createFrequencyModulationGeneratorNode = function (spec) {
	"use strict";
	return this.createOscillatorJavaScriptNode({
		oscillator: this.createFrequencyModulationGenerator(spec)
	});
};