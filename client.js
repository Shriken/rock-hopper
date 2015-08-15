'use strict';

document.addEventListener('DOMContentLoaded', function() {
	var socketIO = require('socket.io-client');

	var config = require('./client/config');
	var Renderer = require('./client/Renderer');
	var GameState = require('./client/GameState');

	var renderer;
	var gameState;

	var init = function() {
		renderer = new Renderer(canvas);

		loop();
	};

	//main loop
	var loop = function() {
		renderer.draw(gameState);

		setTimeout(loop, 1000 / config.fps);
	};

	var socket = socketIO();
	socket.on('server-tick', function(data) {
		gameState = GameState.from(data);
	});

	init();
});
