/*global WaveBase: false */
var LoopWave = function (table) {
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

	this.getValue = function (index) {
		return waveBase.getValue(index);
	};
};