'use strict';

var Victor = require('victor');

var EventQueue = require('./EventQueue');

var SHOOT_DELAY = 60;

//Victor pos, Victor vel, flt radius, flt mass, Asteroid attachedParent
var Player = function(
	pos=new Victor(50, 50),
	vel=new Victor(0, 0),
	mass=0.13,
	radius=5
) {
	this.pos = pos;
	this.vel = vel;
	this.radius = radius;
	this.mass = mass;

	this.parentAsteroid = null;
	this.upVector = null;
	this.timeToShootAllowed = 0;
};

Player.prototype.update = function(gameState) {
	if (this.timeToShootAllowed > 0) {
		this.timeToShootAllowed--;
	}

	// update position
	if (!this.inAir()) {
		var rad = this.radius + this.parentAsteroid.radius;
		var newPos = this.upVector.clone()
			.multiply(new Victor(rad, rad))
			.add(this.parentAsteroid.pos);

		this.vel = newPos.subtract(this.pos);
	}
	this.pos.add(this.vel);

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

	var upDirection = this.pos.clone()
		.subtract(this.parentAsteroid.pos);
	var awayFromAsteroid = upDirection.dot(direction) > 0;
	if (!awayFromAsteroid) {
		return;
	}

	this.parentAsteroid = null;
	this.applyForce(direction);
};

Player.prototype.fire = function(direction) {
	if (this.timeToShootAllowed === 0) {
		EventQueue.pushEvent(
			'player',
			'fire-grenade',
			this.key,
			direction
		);
		this.timeToShootAllowed = SHOOT_DELAY;
	}
};

Player.prototype.inAir = function() {
	return !this.parentAsteroid;
};

Player.prototype.landOn = function(asteroid) {
	this.parentAsteroid = asteroid;
	this.vel = new Victor(0, 0);
	this.upVector = this.pos.clone()
		.subtract(this.parentAsteroid.pos)
		.normalize();
};

Player.prototype.applyForce = function(force) {
	force.divide(new Victor(this.mass, this.mass));
	this.vel.add(force);
};

module.exports = Player;
