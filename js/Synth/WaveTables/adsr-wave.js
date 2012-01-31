/*global SynthAudioContext: false */
SynthAudioContext.prototype.createADSRWave = function (spec) {
	"use strict";
	var totalTime = spec.attackTime + spec.decayTime + spec.sustainTime + spec.releaseTime,
		attackTime = spec.attackTime / totalTime,
		decayTime = spec.decayTime / totalTime,
		sustainLevel = spec.sustainLevel,
		sustainTime = spec.sustainTime / totalTime,
		releaseTime = spec.releaseTime / totalTime;

	return function (index) {
		if (index < attackTime) {
			return index / attackTime;
		}

		if (index < attackTime + decayTime) {
			return 1 - (1 - sustainLevel) * (index - attackTime) / decayTime;
		}

		if (index < attackTime + decayTime + sustainTime) {
			return sustainLevel;
		}

		if (index < 1) {
			return sustainLevel - sustainLevel * (index - attackTime - decayTime - sustainTime) / releaseTime;
		}

		return 0;
	};
};