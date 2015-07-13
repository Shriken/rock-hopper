var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');
var KeyboardController = require('./KeyboardController');

var GameState = function() {
	this.canvas = document.getElementById("canvas");
	this.bounds = new Victor(this.canvas.width, this.canvas.height);
	this.center = new Victor(0, 0);
	this.asteroids = [];
	this.players = [];

	this.init_asteroids();
	this.players.push(new Player(new Victor(50,50), new Victor(2,1), 15, 0, null));

	KeyboardController.init(canvas, this.players[0]);

};

GameState.prototype.init_asteroids = function() {
	var planet = new Asteroid(
		planet,
		this.center.clone(),
		30, 1
	);

	this.asteroids.push(planet);

	this.asteroids.push(new Asteroid(
		planet,
		new Victor(0, -200),
		20, 480
	));

	this.asteroids.push(new Asteroid(
		planet,
		new Victor(0, -100),
		10, 60
	));

	this.asteroids.push(new Asteroid(
		null,
		new Victor(0, -300),
		10, 120
	));
};

GameState.prototype.update = function() {
	for(var i = 0; i < this.asteroids.length; i++) {
		this.asteroids[i].update();
	}
	for(var i = 0; i < this.players.length; i++) {
		this.players[i].update();
	}
};

module.exports = GameState;
