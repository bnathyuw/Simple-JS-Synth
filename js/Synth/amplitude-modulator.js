/*global Oscillator: false, SineWave: false,
	FrequencyCentrer: false, SynthAudioContext: false */
var AmplitudeModulator = function AmplitudeModulator(spec) {
	"use strict";

	if (!this instanceof AmplitudeModulator) {
		return new AmplitudeModulator(spec);
	}

	var carrier = spec.carrier,
		context = spec.context,
		modulator = context.createFrequencyCentrer({
			wave: context.createOscillator({
				amplitude: 0.5,
				waveTable: context.sineWave,
				frequency: spec.frequency
			}),
			frequency: 0.5
		}),

		next = function () {
			return carrier.next() * modulator.next();
		};

	this.next = next;
};

SynthAudioContext.prototype.createAmplitudeModulator = function (spec) {
	"use strict";
	spec.context = this;
	return new AmplitudeModulator(spec);
};

SynthAudioContext.prototype.createAmplitudeModulatorNode = function (spec) {
	"use strict";
	return this.createOscillatorJavaScriptNode({
		oscillator: this.createAmplitudeModulator(spec)
	});
};
