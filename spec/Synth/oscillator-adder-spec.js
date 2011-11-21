/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	OscillatorAdder: false */
describe("OscillatorAdder", function () {
	"use strict";
	var oscillatorAdder,
		osc1,
		osc2,
		osc3;

	beforeEach(function () {
		osc1 = {
			next: function () {
				return 0.25;
			}
		};
		osc2 = {
			next: function () {
				return 0.5;
			}
		};
		osc3 = {
			next: function () {
				return -0.3;
			}
		};
		oscillatorAdder = new OscillatorAdder({
			oscillators: [osc1, osc2, osc3]
		});
	});

	describe("next", function () {
		it("should call next from each component oscillator", function () {
			var spy1 = spyOn(osc1, "next").andCallThrough(),
				spy2 = spyOn(osc2, "next").andCallThrough(),
				spy3 = spyOn(osc3, "next").andCallThrough();
			oscillatorAdder.next();
			expect(spy1).toHaveBeenCalled();
			expect(spy2).toHaveBeenCalled();
			expect(spy3).toHaveBeenCalled();
		});

		it("should return the sum of the values returned from each component oscillator", function () {
			var result = oscillatorAdder.next();
			expect(result).toEqual(0.45);
		});
	});
});