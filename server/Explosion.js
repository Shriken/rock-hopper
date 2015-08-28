'use strict';

var Victor = require('victor');

var EventQueue = require('./EventQueue');

var EXPLOSION_MAX_RAD = 40;
var EXPLOSION_MAX_AGE = 20;

var Explosion = function(pos) {
	this.pos = pos;
	this.age = 0;
	this.rad = 0;
	this.key = null;
};

Explosion.prototype.update = function(gameState) {
	if (this.age++ > EXPLOSION_MAX_AGE) {
		this.die();
		return;
	}

	this.rad = this.age * EXPLOSION_MAX_RAD / EXPLOSION_MAX_AGE;

	gameState.agents.asteroids.forEach(asteroid => {
		var distSq = this.pos.clone()
			.subtract(asteroid.pos)
			.lengthSq();
		var minDist = this.rad + asteroid.radius;

		if (distSq < minDist * minDist) {
			asteroid.die();
		}
	});
};

Explosion.prototype.die = function() {
	EventQueue.pushEvent('explosion', 'die', this.key);
};

module.exports = Explosion;
