/*global WaveTableBase: false */
var ADSRWave = function (spec) {
	"use strict";

	var table = [],
		attackTime = spec.attackTime,
		decayTime = spec.decayTime,
		sustainLevel = spec.sustainLevel,
		sustainTime = spec.sustainTime,
		releaseTime = spec.releaseTime,
		i,
		ADSRWave = function ADSRWave() {};

	for (i = 0; i < attackTime; i = i + 1) {
		table.push(i / attackTime);
	}

	for (i = 0; i < decayTime; i = i + 1) {
		table.push(1 - (1 - sustainLevel) * i / decayTime);
	}

	for (i = 0; i < sustainTime; i = i + 1) {
		table.push(sustainLevel);
	}

	for (i = 0; i < releaseTime; i = i + 1) {
		table.push(sustainLevel - sustainLevel * i / releaseTime);
	}

	ADSRWave.prototype = new WaveTableBase(table);

	return new ADSRWave();
};