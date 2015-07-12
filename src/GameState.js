var Victor = require('victor');

var Asteroid = require('./Asteroid');

var GameState = function() {
	this.canvas = document.getElementById("canvas");
	this.bounds = new Victor(this.canvas.width, this.canvas.height);
	this.center = new Victor(0, 0);
	this.entities = [];

	this.init_asteroids();
};

GameState.prototype.init_asteroids = function() {
	var planet = new Asteroid(
		null,
		this.center.clone(),
		30
	);
	this.entities.push(planet);

	this.entities.push(new Asteroid(
		planet,
		new Victor(0, -200),
		20
	));

	this.entities.push(new Asteroid(
		planet,
		new Victor(0, -100),
		10
	));

	this.entities.push(new Asteroid(
		planet,
		new Victor(0, -300),
		10
	));
};

GameState.prototype.update = function() {
	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].update();
	}
};

module.exports = GameState;
