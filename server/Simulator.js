var socket = require('socket.io');

var GameState = require('./GameState');

var FPS = 60;

var gameState;
var updateOverCallback;
var running = false;

var run = function(callback) {
	updateOverCallback = callback;
	running = true;
	gameState = new GameState();

	loop();
};

var loop = function() {
	if (!running) {
		return;
	}

	gameState.update();
	updateOverCallback();

	setTimeout(loop, 1000 / FPS);
};

module.exports = {
	run: run,
};
