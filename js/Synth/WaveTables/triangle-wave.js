/*global SynthAudioContext: false */
SynthAudioContext.prototype.triangleWave = function (index) {
	"use strict";
	var i = index % 1;
	if (i < 0.25) {
		return i * 4;
	} else if (i < 0.75) {
		return 1 - (i - 0.25) * 4;
	} else {
		return (i - 0.75) * 4 - 1;
	}
};