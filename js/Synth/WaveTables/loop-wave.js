var LoopWave = function (table) {
	"use strict";
  return new WaveBase({
		table: table,
		getTableValue: function (index) {
			return table[index % table.length];
		},
		getTableLength: function() {
			return table.length;
		}
	});
};