var FrequencyCentrer = function FrequencyCentrer(spec) {
	"use strict";

	var frequency = spec.frequency,
		wave = spec.wave,
		next = function () {
			return wave.next() + frequency;
		};

	this.next = next;
};