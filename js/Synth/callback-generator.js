var CallbackGenerator = function CallbackGenerator(spec) {
	"use strict";
	var callback = spec.callback,
		next = function () {
			return callback();
		};

	this.next = next;
};