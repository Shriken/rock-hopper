'use strict';

var Victor = require('victor');

var EventQueue = require('./EventQueue');
var GameStateConfig = require('./GameStateConfig');
var Circler = require('./mixins/Circler');

var Asteroid = function(orbitParent, pos, radius, rotSpeed=0.03, mass=1) {
	this.orbitParent = orbitParent;
	this.pos = pos;
	this.radius = radius;
	this.mass = mass;
	this.rotSpeed = rotSpeed;
	this.destructible = true;
	this.vel = new Victor(0, 0);

	this.setOrbitTime();
};

Asteroid.prototype.setOrbitTime = function() {
	var orbitParent = this.orbitParent;

	this.orbitTime = 1; // default val
	if (this.orbitParent) {
		var orbitRad = this.pos
			.clone()
			.subtract(orbitParent.pos)
			.length();

		var rotVel = Math.sqrt(
			GameStateConfig.GRAVITY_CONST * orbitParent.mass / orbitRad
		) / orbitRad;

		this.orbitTime = 2 * Math.PI / rotVel;
	}
};

Asteroid.prototype.update = function() {
	this.circle(this.orbitParent, this.orbitTime);
	this.pos.add(this.vel);
};

Asteroid.prototype.die = function() {
	if (this.destructible) {
		EventQueue.pushEvent('asteroid', 'die', this.key);
	}
};

Circler.mixInto(Asteroid);

module.exports = Asteroid;
