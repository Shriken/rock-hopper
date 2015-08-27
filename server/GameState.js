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
	this.nextPlayerKey = 0;
	this.nextAsteroidKey = 0;
	this.nextGrenadeKey = 0;

	this.initAsteroids();
};

GameState.prototype.initAsteroids = function() {
	var planet = this.addAsteroid(
		null,
		this.center.clone(),
		50, 0
	);
	planet.destructible = false;

	for (var i = 0; i < config.NUM_ASTEROIDS; i++) {
		var radius = Math.random() * 10 + 10;
		var orbitRadius = config.ORBIT_RAD_MIN +
			Math.random() * (config.ORBIT_RAD_MAX + config.ORBIT_RAD_MIN);
		var pos = new Victor(0, orbitRadius)
			.rotate(Math.random() * Math.PI * 2);

		this.addAsteroid(planet, pos, radius);
	}

	this.addAsteroid(
		planet,
		new Victor(0, -70),
		10
	);
};

GameState.prototype.update = function() {
	this.asteroids.forEach(asteroid => asteroid.update());
	this.players.forEach(player => player.update(this));
	this.grenades.forEach(grenade => grenade.update(this));
};

GameState.prototype.addPlayer = function() {
	var newPlayer = new Player(new Victor(50, 50));
	newPlayer.key = this.nextPlayerKey++;

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
			this.players.splice(i, 1);
			return;
		}
	}
};

GameState.prototype.addAsteroid = function(...args) {
	var asteroid = new Asteroid(...args);
	asteroid.key = this.nextAsteroidKey++;

	this.asteroids.push(asteroid);
	return asteroid;
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
			this.asteroids.splice(i, 1);
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
			this.grenades.splice(i, 1);
			return;
		}
	}
};

module.exports = GameState;
