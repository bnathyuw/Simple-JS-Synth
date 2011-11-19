/*global LoopWave: false */
var SineWave = (function () {
	"use strict";

	var table = [],
		i = 0,
		SineWave = function SineWave() {};

	for (i = 0; i < 1000; i = i + 1) {
		table.push(Math.sin(i * Math.PI / 500));
	}

	SineWave.prototype = new LoopWave(table);

	return SineWave;
}());