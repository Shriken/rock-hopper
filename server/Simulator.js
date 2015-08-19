'use strict';

var Victor = require('victor');

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

	gameState.update();
	runAfterUpdate(gameState);

	setTimeout(loop, 1000 / FPS);
};

var addPlayer = function() {
	if (gameState) {
		return gameState.addPlayer();
	}

	return null;
};

var removePlayer = function(key) {
	if (gameState) {
		return gameState.removePlayer(key);
	}

	return null;
};

var playerAction = function(key, action, ...args) {
	var player = gameState.getPlayer(key);

	if (action === 'jump') {
		var direction = new Victor(args[0].x, args[0].y);
		player.jump(direction);
	}
};

module.exports = {
	run: run,
	addPlayer: addPlayer,
	removePlayer: removePlayer,
	playerAction: playerAction,
};
