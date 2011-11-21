var FrequencyCentrer = function FrequencyCentrer(spec) {
	"use strict";

	var frequency = spec.frequency,
		envelope = spec.envelope,
		next = function () {
			return envelope.next() + frequency;
		};

	this.next = next;

};