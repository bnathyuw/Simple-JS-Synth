var EnvelopeWave = function (table) {
	"use strict";
	return new WaveBase({
		table: table,
		getTableValue: function (index) {
			return table[index];
		},
		getTableLength: function() {
			return table.length - 1;
		}
	});
};