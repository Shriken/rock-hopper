'use strict';

var Victor = require('victor');

var state = {
	socket: null,
	canvas: null,
	key: null,
};

var init = function(socket, key, canvas) {
	state.socket = socket;
	state.canvas = canvas;
	state.key = key;

	state.canvas.addEventListener('mousedown', handleClick);
};

var handleClick = function(event) {
	var canvas = state.canvas;
	var linkedPlayer = state.linkedPlayer;

	if (event.button === 0) { //LMB
		var canvasBounds = canvas.getBoundingClientRect();
		var origin = new Victor(canvas.width / 2, canvas.height / 2)
			.add(new Victor(canvasBounds.left, canvasBounds.top));

		var mousePos = new Victor(event.clientX, event.clientY)
			.subtract(origin);

		var direction = mousePos
			.normalize();

		if (state.socket) {
			state.socket.emit('jump', direction);
		}
	} else {
		//other buttons
	}
};

module.exports = {
	init: init,
};
