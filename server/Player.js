'use strict';

var Victor = require('victor');

var EventQueue = require('./EventQueue');

//Victor pos, Victor vel, flt radius, flt mass, Asteroid attachedParent
var Player = function(
	pos=new Victor(50, 50), vel=new Victor(0, 0),
	mass=0.2, radius=5) {
	this.pos = pos;
	this.vel = vel;
	this.radius = radius;
	this.mass = mass;

	this.parentAsteroid = null;
	this.upDirection = null;
};

Player.prototype.update = function(gameState) {
	// update position
	if (this.inAir()) {
		this.pos.add(this.vel);
	} else {
		this.upDirection.rotate(this.parentAsteroid.rotSpeed);

		var surfaceDist = this.radius + this.parentAsteroid.radius;
		this.pos = this.upDirection.clone()
			.multiply(new Victor(surfaceDist, surfaceDist))
			.add(this.parentAsteroid.pos);
	}

	// check if we landed
	var asteroids = gameState.agents.asteroids;
	for (var i = 0; i < asteroids.length; i++) {
		var asteroid = asteroids[i];

		if (asteroid === this.parentAsteroid) {
			continue;
		}

		var distSq = this.pos.clone()
			.subtract(asteroid.pos)
			.lengthSq();
		var minDist = this.radius + asteroid.radius;

		if (distSq < minDist * minDist) {
			this.landOn(asteroid);
		}
	}
};

Player.prototype.jump = function(direction) {
	if (this.inAir()) {
		return;
	}

	var awayFromAsteroid = this.upDirection.dot(direction) > 0;
	if (!awayFromAsteroid) {
		return;
	}

	this.parentAsteroid = null;
	this.applyForce(direction.clone());
};

Player.prototype.fire = function(direction) {
	EventQueue.pushEvent('player', 'fire-grenade', this.key, direction);
};

Player.prototype.inAir = function() {
	return !this.parentAsteroid;
};

Player.prototype.landOn = function(asteroid) {
	this.parentAsteroid = asteroid;
	this.upDirection = this.pos.clone()
		.subtract(asteroid.pos)
		.normalize();
	this.vel.x = 0;
	this.vel.y = 0;
};

Player.prototype.applyForce = function(force) {
	force.divide(new Victor(this.mass, this.mass));
	this.vel.add(force);
};

module.exports = Player;
