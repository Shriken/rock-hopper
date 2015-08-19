'use strict';

var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');

var GameState = {};

GameState.from = function(gameStateData) {
	gameStateData.center = new Victor(0, 0);
	gameStateData.players = gameStateData.players.map(Player.from);
	gameStateData.asteroids = gameStateData.asteroids.map(Asteroid.from);

	return gameStateData;
};

module.exports = GameState;
