'use strict';

var Victor = require('victor');

var EventQueue = require('./EventQueue');
var GameStateConfig = require('./GameStateConfig');
var OrbiterMixin = require('./mixins/Orbiter');

var Asteroid = function(orbitParent, pos, radius, rotSpeed=0.03, mass=1) {
	this.orbitParent = orbitParent;
	this.pos = pos;
	this.radius = radius;
	this.mass = mass;
	this.rotSpeed = rotSpeed;
	this.destructible = true;

	this.orbitTime = 1; // default val
	if (orbitParent) {
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

Asteroid.prototype.die = function() {
	if (this.destructible) {
		EventQueue.pushEvent('asteroid', 'die', this.key);
	}
};

OrbiterMixin.add(Asteroid);

module.exports = Asteroid;
