/*global LoopWave: false */
var SawtoothWave = function SawtoothWave() {
	"use strict";

	var getValue = function (index) {
			var i = index + 0.5;
			return 2 * (i - Math.floor(i)) - 1;
		};

	this.getValue = getValue;
};