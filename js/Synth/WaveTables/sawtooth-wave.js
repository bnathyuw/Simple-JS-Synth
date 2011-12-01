/*global LoopWave: false */
var SawtoothWave = function SawtoothWave() {
	"use strict";

	var getValue = function (index) {
			var i = index * 1000;
			return ((i + 500) % 1000) / 500 - 1;
		};

	this.getValue = getValue;
};