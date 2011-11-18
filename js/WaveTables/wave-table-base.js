var WaveTableBase = function (table) {
	"use strict";

	var getTableValue = function (index) {
			return table[index % table.length];
		},
		interpolateValue = function (index) {
			var i1 = Math.floor(index),
				i2 = Math.ceil(index),
				v1 = getTableValue(i1),
				v2 = getTableValue(i2),
				di = index % 1,
				dv = v2 - v1;

			return v1 + (dv * di);

		},
		getValue = function (index) {
			index = index * table.length;
			if (index % 1 === 0) {
				return getTableValue(index);
			} else {
				return interpolateValue(index);
			}
		};

	this.getValue = getValue;
};