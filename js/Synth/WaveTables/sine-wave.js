/*global LoopWave: false */
var SineWave = function SineWave() {
	"use strict";

	var getValue = function (index) {
		return Math.sin(2 * Math.PI * index);
	}

	this.getValue = getValue;
};