var SynthAudioContext = function SynthAudioContext () {
	var Ctor = webkitAudioContext,
		audioContext = new Ctor();
	
	this.destination = audioContext.destination;
	this.sampleRate = audioContext.sampleRate;
	this.currentTime = audioContext.currentTime;
	this.listener = audioContext.listener;
	
	this.createBuffer = function (numberOfChannelse, length, sampleRate) {
		return audioContext.createBuffer(numberOfChannels, length, sampleRate);		
	}
	this.decodeAudioData = function (audioData, successCallback, errorCallback) {
		audioContext.decodeAudioData(audioData, successCallback, errorCallback);
	}
	this.createBufferSource = function () {
		return audioContext.createBufferSource;
	}
	this.createJavaScriptNode = function (bufferSize, numberOfInputs, numberOfOutputs) {
		return audioContext.createJavaScriptNode(bufferSize, numberOfInputs, numberOfOutputs);
	}
};
