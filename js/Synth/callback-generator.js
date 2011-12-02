var CallbackGenerator = (function () {
	"use strict";

	var CallbackGenerator = function CallbackGenerator(spec) {
		var next = function () {
				return spec.callback();
			};

		this.next = next;
	};

	return CallbackGenerator;
}());