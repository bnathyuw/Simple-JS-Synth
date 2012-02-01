/*global webkitAudioContext */
var SynthAudioContext = function SynthAudioContext() {
	"use strict";
	var Ctor = webkitAudioContext,
		audioContext = new Ctor();

	this.destination = audioContext.destination;
	this.sampleRate = audioContext.sampleRate;
	this.currentTime = audioContext.currentTime;
	this.listener = audioContext.listener;

	this.createBuffer = function (numberOfChannels, length, sampleRate) {
		return audioContext.createBuffer(numberOfChannels, length, sampleRate);
	};
	this.decodeAudioData = function (audioData, successCallback, errorCallback) {
		audioContext.decodeAudioData(audioData, successCallback, errorCallback);
	};
	this.createBufferSource = function () {
		return audioContext.createBufferSource;
	};
	this.createJavaScriptNode = function (bufferSize, numberOfInputs, numberOfOutputs) {
		return audioContext.createJavaScriptNode(bufferSize, numberOfInputs, numberOfOutputs);
	};
};

SynthAudioContext.prototype.createGenerator = function (input) {
	"use strict";
	var isFunction = function (object) {
		return !!(object && object.constructor && object.call && object.apply);
	};
	return input.next ? input : {
		next: isFunction(input) ? input : function () {
			return input;
		}
	};
};
