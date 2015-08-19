'use strict';

var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');

var GameState = {};

GameState.from = function(gameStateData) {
	gameStateData.center = new Victor(0, 0);
	gameStateData.players = gameStateData.players.map(Player.from);
	gameStateData.asteroids = gameStateData.asteroids.map(Asteroid.from);

	gameStateData.getPlayer = GameState.getPlayer;

	return gameStateData;
};

GameState.getPlayer = function(key) {
	for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].key === key) {
			return this.players[i];
		}
	}
};

module.exports = GameState;
