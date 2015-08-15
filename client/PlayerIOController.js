'use strict';

var Victor = require('victor');
var Player = require('./Player');

var state = {
	linkedPlayer: null,
	canvas: null,
};

var init = function(canvas, player) {
	state.linkedPlayer = player;
	state.canvas = canvas;

	state.canvas.addEventListener('mousedown', handleMouseDown);
};

var rebind = function(canvas, player) {
	if (state.canvas) {
		state.canvas.removeEventListener('mousedown', handleMouseDown);
	}

	init(canvas, player);
};

var handleMouseDown = function(event) {
	var canvas = state.canvas;
	var linkedPlayer = state.linkedPlayer;

	if (event.button == 0) { //LMB
		var rect = canvas.getBoundingClientRect();
		var origin = new Victor(canvas.width / 2, canvas.height / 2);

		var mousePos = new Victor(event.clientX, event.clientY)
			.subtract(new Victor(rect.left, rect.top))
			.subtract(origin);

		var direction = mousePos
			.normalize();

		linkedPlayer.jump(direction);
	} else {
		//other buttons
	}
};

var update = function() {};

module.exports = {
	init: init,
	rebind: rebind,
	update: update,
};
