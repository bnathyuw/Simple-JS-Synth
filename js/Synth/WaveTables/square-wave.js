var SquareWave = function SquareWave() {
	"use strict";

	var getValue = function (index) {
			var i = index % 1;
			return i < 0.5 ? 1 : -1;
		};

	this.getValue = getValue;
};