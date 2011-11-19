/*global WaveTable: false */
var SquareWave = (function () {
	"use strict";

	var table = [],
		i,
		SquareWave = function SquareWave() {};

	for (i = 0; i < 500; i = i + 1) {
		table.push(1);
	}

	for (i = 500; i < 1000; i = i + 1) {
		table.push(-1);
	}

	SquareWave.prototype = new WaveTable(table);

	return SquareWave;
}());