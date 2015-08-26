'use strict';

var Victor = require('victor');

var renderUtils = require('./renderUtils');

var ASTEROID_COLOR = '#531';

var Asteroid = {};

Asteroid.from = function(asteroidData) {
	var pos = asteroidData.pos;
	asteroidData.pos = new Victor(pos.x, pos.y);

	return asteroidData;
};

//Takes canvas context to render on
Asteroid.render = function(ctx, asteroid) {
	ctx.fillStyle = ASTEROID_COLOR;
	renderUtils.fillCircle(ctx, asteroid.pos, asteroid.radius);
};

module.exports = Asteroid;
