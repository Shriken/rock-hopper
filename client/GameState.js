'use strict';

var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');
var Grenade = require('./Grenade');
var Explosion = require('./Explosion');

var GameState = {};

GameState.from = function(gameStateData) {
	gameStateData.center = new Victor(0, 0);

	var agents = gameStateData.agents;
	agents.players = agents.players.map(Player.from);
	agents.asteroids = agents.asteroids.map(Asteroid.from);
	agents.grenades = agents.grenades.map(Grenade.from);
	agents.explosions = agents.explosions.map(Explosion.from);

	gameStateData.getPlayer = GameState.getPlayer;

	return gameStateData;
};

GameState.getPlayer = function(key) {
	var players = this.agents.players;
	for (var i = 0; i < players.length; i++) {
		if (players[i].key === key) {
			return players[i];
		}
	}
};

module.exports = GameState;
