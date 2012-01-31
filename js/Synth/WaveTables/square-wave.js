/*global SynthAudioContext: false */
SynthAudioContext.prototype.squareWave = function (index) {
	"use strict";
	var i = index % 1;
	return i < 0.5 ? 1 : -1;
};