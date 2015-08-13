'use strict';

var Victor = require('victor');
var Player = require('./Player');

var linkedPlayer = null;
var canvas = null;

var init = function(c, lp) {
	linkedPlayer = lp;
	canvas = c;
	canvas.addEventListener('mousedown', handleMouseDown);
};

var handleMouseDown = function(event) {
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
	update: update,
};
