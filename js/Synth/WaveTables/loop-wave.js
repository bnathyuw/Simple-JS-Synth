/*global WaveBase: false */
SynthAudioContext.prototype.createLoopWave = function (table) {
	"use strict";
	var waveBase = new WaveBase({
			table: table,
			getTableValue: function (index) {
				return table[index % table.length];
			},
			getTableLength: function () {
				return table.length;
			}
		});

	return function (index) {
		return waveBase.getValue(index);
	};
};