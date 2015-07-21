var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');
var PlayerIOController = require('./PlayerIOController');

var GameState = function() {
	this.canvas = document.getElementById("canvas");
	this.bounds = new Victor(this.canvas.width, this.canvas.height);
	this.center = new Victor(0, 0);
	this.asteroids = [];
	this.players = [];

	this.init_asteroids();
	this.players.push(new Player(new Victor(50, 50)));

	PlayerIOController.init(canvas, this.players[0]);
};

GameState.prototype.init_asteroids = function() {
	var planet = new Asteroid(
		null,
		this.center.clone(),
		50, 0
	);

	this.asteroids.push(planet);

	var NUM_ASTEROIDS = 30;
	for (var i = 0; i < NUM_ASTEROIDS; i++) {
		var radius = Math.random() * 10 + 10;
		var orbitRadius = Math.random() * 250 + 100;
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
	for(var i = 0; i < this.asteroids.length; i++) {
		this.asteroids[i].update();
	}
	for(var i = 0; i < this.players.length; i++) {
		this.players[i].update(this);
	}
};

module.exports = GameState;
