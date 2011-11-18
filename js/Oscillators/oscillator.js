var Oscillator = (function () {
	"use strict";

	var Oscillator = function Oscillator(spec) {
		var currentIndex = 0,
			next = function () {
				var returnValue = spec.waveTable.getValue(currentIndex);
				currentIndex = currentIndex + spec.frequency * spec.waveTableSize / spec.sampleRate;
				return returnValue * spec.amplitude;
			};

		this.next = next;
	};

	return Oscillator;
}());