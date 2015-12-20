'use strict';

var Victor = require('victor');

var EventQueue = require('./EventQueue');

var GRENADE_LIFETIME = 1 * 60;
var GRENADE_RAD = 4;
var EXPLOSION_RAD = 80;

var Grenade = function(pos, vel=new Victor(0, 0)) {
	this.pos = pos;
	this.vel = vel;
	this.radius = GRENADE_RAD;
	this.age = 0;
};

Grenade.prototype.update = function(gameState) {
	// if the timer is up, explode
	if (this.age++ > GRENADE_LIFETIME) {
		this.explode(gameState);
		return;
	}

	// otherwise, update position as normal
	this.pos.add(this.vel);

	var asteroids = gameState.agents.asteroids;
	for (var i = 0; i < asteroids.length; i++) {
		var asteroid = asteroids[i];

		var distSq = this.pos.clone()
			.subtract(asteroid.pos)
			.lengthSq();
		var minDist = this.radius + asteroid.radius;

		// if you're colliding with the asteroid
		if (distSq < minDist * minDist) {
			// bounce off
			var curSpeed = this.vel.length();
			this.vel = this.pos.clone()
				.subtract(asteroid.pos)
				.normalize()
				.multiply(new Victor(curSpeed * 0.5, curSpeed * 0.5));
			break;
		}
	}
};

Grenade.prototype.explode = function(gameState) {
	EventQueue.pushEvent('grenade', 'explode', this.key);
};

module.exports = Grenade;
