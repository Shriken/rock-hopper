var Victor = require('victor');

var Asteroid = require('./Asteroid');
var renderUtils = require('./renderUtils');

var GameState = function() {
	this.canvas = document.getElementById("canvas");
	this.bounds = new Victor(this.canvas.width, this.canvas.height);
	this.center = this.bounds.clone().divide(new Victor(2,2));
	this.entities = [];

	this.init_asteroids();

	return this;
};

GameState.prototype.init_asteroids = function() {
	this.entities.push(new Asteroid(
		this.center.clone(),
		new Victor(500, 80),
		10, 120
	));

	this.entities.push(new Asteroid(
		this.center.clone(),
		new Victor(500, 200),
		20, 480
	));

	this.entities.push(new Asteroid(
		this.center.clone(),
		new Victor(100, 400),
		10, 60
	));

	this.entities.push(new Asteroid(
		this.center.clone(),
		this.center.clone(),
		30, 1
	));
};

GameState.prototype.update = function() {
	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].update();
	}
};

module.exports = GameState;
