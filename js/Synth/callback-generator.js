/*global SynthAudioContext: false */
var CallbackGenerator = function CallbackGenerator(spec) {
	"use strict";
	var callback = spec.callback,
		next = function () {
			return callback();
		};

	this.next = next;
};

SynthAudioContext.prototype.createCallbackGenerator = function (spec) {
	"use strict";
	return new CallbackGenerator(spec);
};