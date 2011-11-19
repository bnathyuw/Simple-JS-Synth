var Oscillator = (function () {
	"use strict";

	var Oscillator = function Oscillator(spec) {
		var currentIndex = 0,
			waveTable = spec.waveTable,
			frequency = spec.frequency,
			sampleRate = spec.sampleRate,
			amplitude = spec.amplitude.next ? spec.amplitude : {
				next: function () {
					return spec.amplitude;
				}
			},
			next = function () {
				var returnValue = waveTable.getValue(currentIndex);
				currentIndex = currentIndex + frequency  / sampleRate;
				return returnValue * amplitude.next();
			};

		this.next = next;
	};

	return Oscillator;
}());