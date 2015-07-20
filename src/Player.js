var Victor = require('victor');
var renderUtils = require('./renderUtils');
var Asteroid = require('./Asteroid');

//Victor pos, Victor vel, flt radius, flt mass, Asteroid attachedParent
var Player = function(pos, vel=(new Victor(0, 0)), mass=0.2, radius=5) {
	this.pos = pos;
	this.vel = vel;
	this.radius = radius;
	this.mass = mass;

	this.parentAsteroid = null;
	this.upDirection = null;
};

Player.prototype.update = function(gameState) {
	if (this.parentAsteroid) {
		this.upDirection.rotate(this.parentAsteroid.rotSpeed);

		var surfaceDist = this.radius + this.parentAsteroid.radius;
		this.pos = this.upDirection.clone()
			.multiply(new Victor(surfaceDist, surfaceDist))
			.add(this.parentAsteroid.pos);
	} else {
		this.pos.add(this.vel);
	}

	// check if we landed
	for (var asteroid of gameState.asteroids) {
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

//Takes canvas context to render on
Player.prototype.render = function(ctx) {
	ctx.fillStyle = '#0d0';
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

Player.prototype.jump = function(direction) {
	if (!this.parentAsteroid) {
		return;
	}

	var awayFromAsteroid = this.upDirection.dot(direction) > 0;
	if (!awayFromAsteroid) {
		return;
	}

	this.parentAsteroid = null;
	this.applyForce(direction.clone());
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
