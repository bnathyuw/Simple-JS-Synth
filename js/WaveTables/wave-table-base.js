var WaveTableBase = function (table) {
	"use strict";

	var getValue = function (index) {
			return table[Math.round(index) % table.length];
		};

	this.getValue = getValue;
};