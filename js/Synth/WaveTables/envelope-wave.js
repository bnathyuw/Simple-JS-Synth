/*global WaveBase: false, SynthAudioContext: false */
SynthAudioContext.prototype.createEnvelopeWave = function (table) {
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

	return function (index) {
		return waveBase.getValue(index);
	};
};