/*global SynthAudioContext: false */
SynthAudioContext.prototype.sineWave = function (index) {
	"use strict";
	return Math.sin(2 * Math.PI * index);
};