var Oscillator = (function () {
	"use strict";

	var Oscillator = function Oscillator(spec) {
		var currentIndex = 0,
			waveTable = spec.waveTable,
			frequency = spec.frequency,
			sampleRate = spec.sampleRate,
			amplitude = spec.amplitude,
			waveTableSize = waveTable.getTableSize(),
			next = function () {
				var returnValue = waveTable.getValue(currentIndex);
				currentIndex = currentIndex + frequency * waveTableSize / sampleRate;
				return returnValue * amplitude;
			};

		this.next = next;
	};

	return Oscillator;
}());