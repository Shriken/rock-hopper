'use strict';

var Victor = require('victor');

var GameStateConfig = require('./GameStateConfig');

var Asteroid = function(orbitParent, pos, radius, rotSpeed=0.03, mass=1) {
	this.orbitParent = orbitParent;
	this.pos = pos;
	this.radius = radius;
	this.mass = mass;
	this.rotSpeed = rotSpeed;

	if (orbitParent) {
		var orbitRad = this.pos
			.clone()
			.subtract(orbitParent.pos)
			.length();
		var vel = Math.sqrt(
			GameStateConfig.GRAVITY_CONST * orbitParent.mass / orbitRad
		) / orbitRad;
		this.orbitTime = 2 * Math.PI / vel;
	} else {
		// this Asteroid doesn't orbit, so placeholder!
		this.orbitTime = 1;
	}
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

module.exports = Asteroid;
