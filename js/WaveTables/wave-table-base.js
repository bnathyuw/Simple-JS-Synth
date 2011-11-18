var WaveTableBase = function (table) {
	"use strict";

	var getValue = function (index) {
			return table[index % table.length];
		};

	this.getValue = getValue;
};