var socket = require('socket.io');

var GameState = require('./GameState');

var FPS = 60;

var gameState;
var runAfterUpdate;
var running = false;

var run = function(callback) {
	runAfterUpdate = callback;
	running = true;
	gameState = new GameState();

	loop();
};

var loop = function() {
	if (!running) {
		return;
	}

	updateGameState(gameState);
	runAfterUpdate();

	setTimeout(loop, 1000 / FPS);
};

var updateGameState = function(gameState) {
	for(var i = 0; i < gameState.asteroids.length; i++) {
		gameState.asteroids[i].update();
	}

	for(var i = 0; i < gameState.players.length; i++) {
		gameState.players[i].update(gameState);
	}
};

module.exports = {
	run: run,
};
