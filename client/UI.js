'use strict';

var Victor = require('victor');

var state = {
	socket: null,
	canvas: null,
	key: null,
};

function init(socket, key, canvas) {
	state.socket = socket;
	state.canvas = canvas;
	state.key = key;

	state.canvas.addEventListener('mousedown', handleClick);
}

function handleClick(event) {
	var canvas = state.canvas;

	if (event.button === 0) { //LMB
		var canvasBounds = canvas.getBoundingClientRect();
		var origin = new Victor(canvas.width / 2, canvas.height / 2)
			.add(new Victor(canvasBounds.left, canvasBounds.top));

		var mousePos = new Victor(event.clientX, event.clientY)
			.subtract(origin);

		var direction = mousePos
			.normalize();

		if (state.socket) {
			state.socket.emit('jump-or-fire', direction);
		}
	} else {
		//other buttons
	}
}

module.exports = {
	init: init,
};
