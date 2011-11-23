var WaveBase = function (spec) {
	"use strict";

	var getTableValue = spec.getTableValue,
		getTableLength = spec.getTableLength,
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
			index = index * getTableLength();
			if (index % 1 === 0) {
				return getTableValue(index);
			} else {
				return interpolateValue(index);
			}
		};

	this.getValue = getValue;
};