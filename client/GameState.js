'use strict';

var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');
var config = require('./GameStateConfig');

var GameState = function() {
	this.canvas = document.getElementById('canvas');
	this.bounds = new Victor(this.canvas.width, this.canvas.height);
	this.center = new Victor(0, 0);
	this.asteroids = [];
	this.players = [];
};

GameState.prototype.init = function() {
	this.initAsteroids();
	this.players.push(new Player(new Victor(50, 50)));
	this.primaryPlayer = this.players[0];
};

GameState.from = function(gameStateData) {
	var gameState = new GameState();
	gameState.players = gameStateData.players.map(Player.from);
	gameState.asteroids = gameStateData.asteroids.map(Asteroid.from);

	return gameState;
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
};

module.exports = GameState;
