var Victor = require('victor');
var renderUtils = require('./renderUtils');
var Asteroid = require('./Asteroid');

//Victor pos, Victor vel, flt radius, flt mass, Asteroid attachedParent
var Player = function(pos, vel=(new Victor(0, 0)), mass=1, radius=5) {
	this.pos = pos;
	this.vel = vel;
	this.radius = radius;
	this.mass = mass;

	this.parentAsteroid = null;
	this.upDirection = null;
};

Player.prototype.update = function(gameState) {
	// check if we landed
	for (var asteroid of gameState.asteroids) {
		if (asteroid === this.parentAsteroid) {
			continue;
		}

		var distSq = this.pos.clone()
			.subtract(asteroid.pos)
			.lengthSq();
		var minDist = this.radius * this.radius +
			asteroid.radius * asteroid.radius;

		if (distSq < minDist) {
			this.landOn(asteroid);
		}
	}

	if (this.parentAsteroid) {
		this.upDirection.rotate(this.parentAsteroid.rotSpeed);

		var surfaceDist = Math.sqrt(
			this.radius * this.radius +
			this.parentAsteroid.radius * this.parentAsteroid.radius
		);
		this.pos = this.upDirection.clone()
			.multiply(new Victor(surfaceDist, surfaceDist))
			.add(this.parentAsteroid.pos);
	} else {
		this.pos.add(this.vel);
	}
};

//Takes canvas context to render on
Player.prototype.render = function(ctx) {
	ctx.fillStyle = "#0F0";
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

Player.prototype.applyForce = function(force) {
	force.divide(new Victor(this.mass, this.mass));
	this.vel.add(force);
};

Player.prototype.landOn = function(asteroid) {
	this.parentAsteroid = asteroid;
	this.upDirection = this.pos.clone()
		.subtract(asteroid.pos)
		.normalize();
};

module.exports = Player;
