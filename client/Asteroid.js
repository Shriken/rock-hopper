'use strict';

var Victor = require('victor');

var renderUtils = require('./renderUtils');
var consts = require('./consts');

var Asteroid = function(orbitParent, pos, radius, rotSpeed=0.03, mass=1) {
	this.orbitParent = orbitParent;
	this.pos = pos;
	this.radius = radius;
	this.mass = mass;
	this.rotSpeed = rotSpeed;

	if (orbitParent) {
		var orbitRad = pos
			.clone()
			.subtract(orbitParent.pos)
			.length();
		var vel = Math.sqrt(
			consts.GRAVITY_CONST * orbitParent.mass / orbitRad
		) / orbitRad;
		this.orbitTime = 2 * Math.PI / vel;
	} else {
		// this Asteroid doesn't orbit, so placeholder!
		this.orbitTime = 1;
	}
};

Asteroid.from = function(asteroidData) {
	var pos = asteroidData.pos;
	pos = new Victor(pos.x, pos.y);

	var newAsteroid = new Asteroid(
		asteroidData.orbitParent,
		pos,
		asteroidData.radius,
		asteroidData.rotSpeed,
		asteroidData.mass,
	);

	return newAsteroid;
};

Asteroid.prototype.update = function() {
	var orbitCenter;
	if (this.orbitParent) {
		orbitCenter = this.orbitParent.pos;
	} else {
		orbitCenter = new Victor(0, 0);
	}

	this.pos.subtract(orbitCenter);
	this.pos.rotate((2 * Math.PI) / this.orbitTime);
	this.pos.add(orbitCenter);
};

//Takes canvas context to render on
Asteroid.prototype.render = function(ctx) {
	ctx.fillStyle = '#531';
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Asteroid;
