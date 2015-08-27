'use strict';

var Victor = require('victor');

var GameState = require('./GameState');
var EventQueue = require('./EventQueue');

var FPS = 60;

var gameState;
var runAfterUpdate;
var running = false;

var eventFuncs = {};

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
};

var addPlayer = function() {
	if (gameState) {
		return gameState.addAgent('player').key;
	}

	return null;
};

var removePlayer = function(key) {
	if (gameState) {
		return gameState.removeAgent('player', key);
	}

	return null;
};

var pushEvent = function(...args) {
	EventQueue.pushEvent(...args);
};

var triggerEvent = function(type, ...args) {
	var func = eventFuncs[type];
	if (func) {
		func(...args);
	} else {
		console.log('event unrecognized:', type);
	}
};

eventFuncs.player = function(action, key, ...args) {
	var player = gameState.getAgent('player', key);
	if (!player) {
		return;
	}

	if (action === 'jump-or-fire') {
		let direction = new Victor(args[0].x, args[0].y);
		if (player.inAir()) {
			player.fire(direction);
		} else {
			player.jump(direction);
		}
	} else if (action === 'fire-grenade') {
		let direction = new Victor(args[0].x, args[0].y);

		var pos = player.pos.clone();
		var vel = player.vel.clone()
			.add(direction.multiply(new Victor(5, 5)));

		gameState.addAgent('grenade', pos, vel);
	}
};

eventFuncs.asteroid = function(action, key) {
	var asteroid = gameState.getAgent('asteroid', key);
	if (!asteroid) {
		return;
	}

	if (action === 'die') {
		gameState.removeAgent('asteroid', key);
	}
};

eventFuncs.grenade = function(action, key) {
	var grenade = gameState.getAgent('grenade', key);
	if (!grenade) {
		return;
	}

	if (action === 'explode') {
		gameState.addAgent('explosion', grenade.pos.clone());
		gameState.removeAgent('grenade', key);
	}
};

eventFuncs.explosion = function(action, key) {
	var explosion = gameState.getAgent('explosion', key);
	if (!explosion) {
		return;
	}

	if (action === 'die') {
		gameState.removeAgent('explosion', key);
	}
};

module.exports = {
	run: run,
	addPlayer: addPlayer,
	removePlayer: removePlayer,
	pushEvent: pushEvent,
};
