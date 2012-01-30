SynthAudioContext.prototype.squareWave = function (index) {
	var i = index % 1;
	return i < 0.5 ? 1 : -1;
};