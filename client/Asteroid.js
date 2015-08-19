'use strict';

var Victor = require('victor');

var renderUtils = require('./renderUtils');

var Asteroid = {};

Asteroid.from = function(asteroidData) {
	var pos = asteroidData.pos;
	asteroidData.pos = new Victor(pos.x, pos.y);

	asteroidData.render = Asteroid.render;

	return asteroidData;
};

//Takes canvas context to render on
Asteroid.render = function(ctx) {
	ctx.fillStyle = '#531';
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Asteroid;
