document.body.onload = function() {
	var socketIO = require('socket.io-client');

	var config = require('./client/config');
	var Renderer = require('./client/Renderer');
	var GameState = require('./client/GameState');

	var renderer;
	var gameState;

	var socket = socketIO();

	var init = function() {
		gameState = new GameState();
		renderer = new Renderer(canvas);

		loop();
	};

	//main loop
	var loop = function() {
		gameState.update();
		renderer.draw(gameState);

		setTimeout(loop, 1000 / config.fps);
	};

	init();
};
