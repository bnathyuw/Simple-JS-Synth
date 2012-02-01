/*global SynthAudioContext: false */
SynthAudioContext.prototype.createMultipleCarrierFrequencyModulator = function (spec) {
	"use strict";
	var context = this,
		modulationIndex,
		frequencyDeviation,
		modulatorFrequency,
		modulatorOscillator,
		carrierFrequencies,
		i,
		carrierFrequency,
		modulatorProxy,
		modulatorNext,
		modulatorCurrent,
		currentFrequency,
		carrierFrequencyAdder,
		carrierOscillator,
		carrierAmplitude,
		carrierOscillators,
		carrierAdder;

	carrierAmplitude = context.createGenerator(spec.carrierAmplitude || 1);
	modulatorFrequency = context.createGenerator(spec.modulatorFrequency);
	modulationIndex = context.createGenerator(spec.modulationIndex);
	frequencyDeviation = {
		next: function () {
			return modulatorFrequency.next() * modulationIndex.next();
		}
	};
	carrierFrequencies = spec.carrierFrequencies;

	modulatorOscillator = context.createOscillator({
		waveTable: context.sineWave,
		amplitude: frequencyDeviation,
		frequency: modulatorFrequency
	});

	modulatorNext = function () {
		currentFrequency = modulatorOscillator.next();
		return currentFrequency;
	};

	modulatorCurrent = function () {
		return currentFrequency;
	};

	carrierOscillators = [];

	for (i = 0; i < carrierFrequencies.length; i = i + 1) {
		carrierFrequency = context.createGenerator(carrierFrequencies[i]);
		modulatorProxy = {
			next: i === 0 ? modulatorNext : modulatorCurrent
		};
		carrierFrequencyAdder = context.createOscillatorAdder({
			oscillators: [
				modulatorProxy,
				carrierFrequency
			]
		});
		carrierOscillator = context.createOscillator({
			waveTable: context.sineWave,
			amplitude: carrierAmplitude,
			frequency: carrierFrequencyAdder
		});
		carrierOscillators.push(carrierOscillator);
	}

	carrierAdder = context.createOscillatorAdder({
		oscillators: carrierOscillators
	});

	return carrierAdder;
};

SynthAudioContext.prototype.createMultipleCarrierFrequencyModulatorNode = function (spec) {
	"use strict";
	return this.createOscillatorJavaScriptNode({
		oscillator: this.createMultipleCarrierFrequencyModulator(spec)
	});
};