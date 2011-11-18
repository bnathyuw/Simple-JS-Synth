var EnvelopeOscillator = (function () {
	"use strict";

	var EnvelopeOscillator = function EnvelopeOscillator(spec) {
		var currentIndex = 0,
			waveTable = spec.waveTable,
			duration = spec.duration,
			sampleRate = spec.sampleRate,
			amplitude = spec.amplitude,
			next = function () {
				if (currentIndex >= 1) {
					return 0;
				}

				var returnValue	= waveTable.getValue(currentIndex);
				currentIndex = currentIndex + 1 / (duration * sampleRate);
				return returnValue * amplitude;
			};

		this.next = next;
	};

	return EnvelopeOscillator;
}());