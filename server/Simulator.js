'use strict';

var Victor = require('victor');

var GameState = require('./GameState');
var EventQueue = require('./EventQueue');

var FPS = 60;

var gameState;
var runAfterUpdate;
var running = false;

function run(callback) {
	runAfterUpdate = callback;
	running = true;
	gameState = new GameState();

	loop();
}

function loop() {
	if (!running) {
		return;
	}

	while (true) {
		var thisEvent = EventQueue.getNextEvent();
		if (!thisEvent) {
			break;
		}

		triggerEvent(...thisEvent);
	}

	gameState.update();
	runAfterUpdate(gameState);

	setTimeout(loop, 1000 / FPS);
}

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

var pushEvent = function(...args) {
	EventQueue.pushEvent(...args);
};

var triggerEvent = function(type, ...args) {
	if (type === 'jump-or-fire' || type === 'fire-grenade') {
		playerAction(type, ...args);
	} else {
		console.log('event unrecognized:', type);
	}
};

var playerAction = function(action, key, ...args) {
	var player = gameState.getPlayer(key);
	if (!player) {
		return;
	}

	if (action === 'jump-or-fire') {
		var direction = new Victor(args[0].x, args[0].y);
		if (player.inAir()) {
			player.fire(direction);
		} else {
			player.jump(direction);
		}
	} else if (action === 'fire-grenade') {
		var direction = new Victor(args[0].x, args[0].y);

		var pos = player.pos.clone();
		var vel = player.vel.clone()
			.add(direction.multiply(new Victor(5, 5)));

		gameState.addGrenade(pos, vel);
	}
};

module.exports = {
	run: run,
	addPlayer: addPlayer,
	removePlayer: removePlayer,
	pushEvent: pushEvent,
};
