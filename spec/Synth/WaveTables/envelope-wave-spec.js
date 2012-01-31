/*global describe: false, beforeEach: false, it: false, expect: false,
	EnvelopeWave: false, SynthAudioContext: false */
describe("EnvelopeWave", function () {
	"use strict";

	var table = [1, 1, 1, 0.5, 0],
		envelope;

	beforeEach(function () {
		envelope = new SynthAudioContext().createEnvelopeWave(table);
	});

	it("should look up the value from the supplied table", function () {
		var result = envelope(0.75);
		expect(result).toEqual(table[3]);
	});

	it("should the final value for index 1", function () {
		var result = envelope(1);
		expect(result).toEqual(0);
	});
});