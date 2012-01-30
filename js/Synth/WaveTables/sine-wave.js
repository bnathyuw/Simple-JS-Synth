var SineWave = function SineWave() {
	"use strict";

	var getValue = function (index) {
			return Math.sin(2 * Math.PI * index);
		};

	this.getValue = getValue;
};

SynthAudioContext.prototype.createSineWave = function() {
	return new SineWave();
}

SynthAudioContext.prototype.sineWave = new SineWave().getValue;