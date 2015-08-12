var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');
var config = require('./GameStateConfig');

var GameState = function() {
	this.center = new Victor(0, 0);
	this.asteroids = [];
	this.players = [];

	initAsteroids(this);
	this.players.push(new Player(new Victor(50, 50)));
};

var initAsteroids = function(gameState) {
	var planet = new Asteroid(
		null,
		gameState.center.clone(),
		50, 0
	);

	gameState.asteroids.push(planet);

	for (var i = 0; i < config.NUM_ASTEROIDS; i++) {
		var radius = Math.random() * 10 + 10;
		var orbitRadius = config.ORBIT_RAD_MIN +
			Math.random() * (config.ORBIT_RAD_MAX + config.ORBIT_RAD_MIN);
		var pos = new Victor(0, orbitRadius)
			.rotate(Math.random() * Math.PI * 2);

		gameState.asteroids.push(new Asteroid(planet, pos, radius));
	}

	gameState.asteroids.push(new Asteroid(
		planet,
		new Victor(0, -70),
		10
	));
};

module.exports = GameState;
