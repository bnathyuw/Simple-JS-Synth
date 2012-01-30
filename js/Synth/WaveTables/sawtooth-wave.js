SynthAudioContext.prototype.sawtoothWave = function (index) {
	var i = index + 0.5;
	return 2 * (i - Math.floor(i)) - 1;
};