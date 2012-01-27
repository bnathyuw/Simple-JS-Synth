/*global describe: false, beforeEach: false, it: false, spyOn: false, expect: false,
	CallbackGenerator: false */
describe("CallbackGenerator", function () {
	"use strict";
	it("should call the callback", function () {
		var callback = function () {},
			spec = {callback: callback},
			spy = spyOn(spec, "callback"),
			callbackGenerator = new CallbackGenerator(spec);

		callbackGenerator.next();

		expect(spy).toHaveBeenCalled();
	});

	it("should return the value from the callback", function () {
		var expectedResult = 0.762,
			callback = function () {
				return expectedResult;
			},
			spec = {callback: callback},
			callbackGenerator = new CallbackGenerator(spec),
			result = callbackGenerator.next();

		expect(result).toEqual(expectedResult);
	});
});