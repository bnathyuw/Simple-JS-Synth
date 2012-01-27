var EnvelopeGenerator = function EnvelopeGenerator(spec) {
	"use strict";
	var currentIndex = 0,
		waveTable = spec.waveTable,
		duration = spec.duration,
		sampleRate = spec.sampleRate,
		amplitude = spec.amplitude,
		next = function () {
			if (currentIndex >= 1) {
				throw { name: "EnvelopeComplete" };
			}

			var returnValue	= waveTable.getValue(currentIndex);
			currentIndex = currentIndex + 1 / (duration * sampleRate);
			return returnValue * amplitude;
		};

	this.next = next;
};