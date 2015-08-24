'use strict';

var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');
var Grenade = require('./Grenade');
var config = require('./GameStateConfig');

var GameState = function() {
	this.center = new Victor(0, 0);
	this.asteroids = [];
	this.players = [];
	this.grenades = [];
	this.nextPlayerId = 0;

	this.initAsteroids();
};

GameState.prototype.initAsteroids = function() {
	var planet = new Asteroid(
		null,
		this.center.clone(),
		50, 0
	);

	this.asteroids.push(planet);

	for (var i = 0; i < config.NUM_ASTEROIDS; i++) {
		var radius = Math.random() * 10 + 10;
		var orbitRadius = config.ORBIT_RAD_MIN +
			Math.random() * (config.ORBIT_RAD_MAX + config.ORBIT_RAD_MIN);
		var pos = new Victor(0, orbitRadius)
			.rotate(Math.random() * Math.PI * 2);

		this.asteroids.push(new Asteroid(planet, pos, radius));
	}

	this.asteroids.push(new Asteroid(
		planet,
		new Victor(0, -70),
		10
	));
};

GameState.prototype.update = function() {
	this.asteroids.forEach(asteroid => asteroid.update());
	this.players.forEach(player => player.update(this));
	this.grenades.forEach(grenade => grenade.update(this));
};

GameState.prototype.addPlayer = function() {
	var newPlayer = new Player(new Victor(50, 50));
	newPlayer.key = this.nextPlayerId++;

	this.players.push(newPlayer);

	return newPlayer.key;
};

GameState.prototype.getPlayer = function(key) {
	for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].key === key) {
			return this.players[i];
		}
	}
};

GameState.prototype.removePlayer = function(key) {
	for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].key === key) {
			this.players.pop(i);
			return;
		}
	}
};

GameState.prototype.getAsteroid = function(key) {
	for (var i = 0; i < this.asteroids.length; i++) {
		if (this.asteroids[i].key === key) {
			return this.asteroids[i];
		}
	}
};

GameState.prototype.removeAsteroid = function(key) {
	for (var i = 0; i < this.asteroids.length; i++) {
		if (this.asteroids[i].key === key) {
			this.asteroids.pop(i);
			return;
		}
	}
};

GameState.prototype.addGrenade = function(pos, vel) {
	this.grenades.push(new Grenade(pos, vel));
};

GameState.prototype.getGrenade = function(key) {
	for (var i = 0; i < this.grenades.length; i++) {
		if (this.grenades[i].key === key) {
			return this.grenades[i];
		}
	}
};

GameState.prototype.removeGrenade = function(key) {
	for (var i = 0; i < this.grenades.length; i++) {
		if (this.grenades[i].key === key) {
			this.grenades.pop(i);
			return;
		}
	}
};

module.exports = GameState;
