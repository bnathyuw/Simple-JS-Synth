var TriangleWave = function TriangleWave() {
	"use strict";

	var getValue = function (index) {
			var i = index % 1;
			if (i < 0.25) {
				return i * 4;
			} else if (i < 0.75) {
				return 1 - (i - 0.25) * 4;
			} else {
				return (i - 0.75) * 4 - 1;
			}
		};

	this.getValue = getValue;
};