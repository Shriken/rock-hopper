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
	pushEvent('player', 'add');
	return gameState.getNextQueuedKey();
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
	if (action === 'add') {
		gameState.addAgent('player');
	}

	var player = gameState.getAgent('player', key);
	if (!player) {
		return;
	}

	if (action === 'remove') {
		gameState.removeAgent('player', key);
	} else if (action === 'jump-or-fire') {
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
	} else {
		console.log('bad action type: player', action);
	}
};

eventFuncs.asteroid = function(action, key) {
	var asteroid = gameState.getAgent('asteroid', key);
	if (!asteroid) {
		return;
	}

	if (action === 'die') {
		gameState.removeAgent('asteroid', key);
	} else {
		console.log('bad action type: asteroid', action);
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
	} else {
		console.log('bad action type: grenade', action);
	}
};

eventFuncs.explosion = function(action, key) {
	var explosion = gameState.getAgent('explosion', key);
	if (!explosion) {
		return;
	}

	if (action === 'die') {
		gameState.removeAgent('explosion', key);
	} else {
		console.log('bad action type: explosion', action);
	}
};

module.exports = {
	run: run,
	addPlayer: addPlayer,
	pushEvent: pushEvent,
};
