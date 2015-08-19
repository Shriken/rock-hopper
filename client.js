/* jshint browserify: true */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
	var socketIO = require('socket.io-client');

	var config = require('./client/config');
	var Renderer = require('./client/Renderer');
	var GameState = require('./client/GameState');
	var UI = require('./client/UI');

	var renderer;
	var gameState;

	var canvas = document.getElementById('canvas');

	var socket = socketIO();
	socket.on('server-tick', function(data) {
		gameState = GameState.from(data);
	});

	socket.on('set-key', function(key) {
		renderer.activePlayer = key;

		UI.init(socket, key, canvas);
	});

	var init = function() {
		renderer = new Renderer(canvas);

		loop();
	};

	//main loop
	var loop = function() {
		renderer.draw(gameState);

		setTimeout(loop, 1000 / config.fps);
	};

	init();
});
