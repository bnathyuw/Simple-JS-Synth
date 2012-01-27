/*global WaveBase: false */
var EnvelopeWave = function (table) {
	"use strict";
	var waveBase = new WaveBase({
			table: table,
			getTableValue: function (index) {
				return table[index];
			},
			getTableLength: function () {
				return table.length - 1;
			}
		});

	this.getValue = function (index) {
		return waveBase.getValue(index);
	};
};