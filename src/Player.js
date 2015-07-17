var Victor = require('victor');
var renderUtils = require('./renderUtils');
var Asteroid = require('./Asteroid');

//Victor pos, Victor vel, flt radius, flt mass, Asteroid attachedParent
var Player = function(pos, vel=(new Victor(0, 0)), mass=1, radius=5) {
	this.pos = pos;
	this.vel = vel;
	this.radius = radius;
	this.mass = mass;

	this.attachedAsteroid = null;
	this.asteroidAngle = null;
};

Player.prototype.update = function(gameState) {
	// check if we landed
	for (var asteroid of gameState.asteroids) {
		var distSq = this.pos.clone()
			.subtract(asteroid.pos)
			.lengthSq();
		var minDist = this.radius * this.radius +
			asteroid.radius * asteroid.radius;

		if (distSq < minDist) {
			this.landOn(asteroid);
		}
	}

	if (this.attachedAsteroid) {
		console.log("attached to asteroid");
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
	this.attachedAsteroid = asteroid;
	this.asteroidAngle = asteroid.pos.clone()
		.subtract(this.pos)
		.angle();
};

module.exports = Player;
