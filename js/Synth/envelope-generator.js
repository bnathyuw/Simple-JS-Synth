var EnvelopeGenerator = function EnvelopeGenerator(spec) {
	"use strict";
	var currentIndex = 0,
		waveTable = spec.waveTable,
		duration = spec.duration,
		context = spec.context,
		sampleRate = context.sampleRate,
		amplitude = spec.amplitude,
		next = function () {
			if (currentIndex >= 1) {
				throw { name: "EnvelopeComplete" };
			}

			var returnValue	= waveTable(currentIndex);
			currentIndex = currentIndex + 1 / (duration * sampleRate);
			return returnValue * amplitude;
		};

	this.next = next;
};

SynthAudioContext.prototype.createEnvelopeGenerator = function(spec) {
	spec.context = this;
	return new EnvelopeGenerator(spec);
}