/*global WaveTable: false */
var SawtoothWave = (function () {
	"use strict";

	var table = [],
		i = 0,
		SawtoothWave = function SawtoothWave() {};

	for (i = 0; i < 1000; i = i + 1) {
		table.push(((i + 500) % 1000) / 500 - 1);
	}

	SawtoothWave.prototype = new WaveTable(table);

	return SawtoothWave;
}());