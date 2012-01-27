/*global Oscillator: false, OscillatorAdder: false, SineWave: false */
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

	var carrierFrequency = spec.carrierFrequency.next ? spec.carrierFrequency : {
			next: function () {
				return spec.carrierFrequency;
			}
		},
		carrierAmplitude = spec.carrierAmplitude,
		modulatorFrequency = spec.modulatorFrequency.next ? spec.modulatorFrequency : {
			next: function () {
				return spec.modulatorFrequency;
			}
		},
		modulationIndex = spec.modulationIndex.next ? spec.modulationIndex : {
			next: function () {
				return spec.modulationIndex;
			}
		},
		modulatorAmplitude = {
			next: function () {
				return modulatorFrequency.next() * modulationIndex.next();
			}
		},
		sampleRate = spec.sampleRate,
		frequencyOscillator = new Oscillator({
			frequency: modulatorFrequency,
			amplitude: modulatorAmplitude,
			waveTable: new SineWave(),
			sampleRate: sampleRate
		}),
		addedFrequencies = new OscillatorAdder({
			oscillators: [
				frequencyOscillator,
				carrierFrequency
			]
		}),
		oscillator = new Oscillator({
			frequency: addedFrequencies,
			amplitude: carrierAmplitude,
			waveTable: new SineWave(),
			sampleRate: sampleRate
		}),
		next = function () {
			return oscillator.next();
		};

	this.next = next;
};