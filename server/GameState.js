'use strict';

var Victor = require('victor');

var Asteroid = require('./Asteroid');
var Player = require('./Player');
var Grenade = require('./Grenade');
var Explosion = require('./Explosion');
var config = require('./GameStateConfig');

var GameState = function() {
	this.center = new Victor(0, 0);

	this.agents = {
		asteroids: [],
		players: [],
		grenades: [],
		explosions: [],
	};

	this.nextAgentKey = 0;

	this.initAsteroids();
};

GameState.prototype.initAsteroids = function() {
	var planet = this.addAgent(
		'asteroid',
		null,
		this.center.clone(),
		50, 0
	);
	planet.destructible = false;

	for (var i = 0; i < config.NUM_ASTEROIDS; i++) {
		var radius = Math.random() * 10 + 10;

		var MIN = config.ORBIT_RAD_MIN;
		var MAX = config.ORBIT_RAD_MAX;
		var orbitRadius = MIN + Math.sqrt(Math.random()) * (MAX - MIN);
		var pos = new Victor(0, orbitRadius)
			.rotate(Math.random() * 2 * Math.PI);

		this.addAgent('asteroid', planet, pos, radius);
	}

	this.addAgent(
		'asteroid',
		planet,
		new Victor(0, -70),
		10
	);
};

GameState.prototype.update = function() {
	this.agents.grenades.forEach(grenade => grenade.update(this));
	this.agents.explosions.forEach(explosion => explosion.update(this));
	this.agents.asteroids.forEach(asteroid => asteroid.update(this));
	this.agents.players.forEach(player => player.update(this));
};

GameState.prototype.getAgentList = function(type) {
	type += 's';

	var list = this.agents[type];
	list = list ? list : null;

	return list;
};

GameState.prototype.addAgent = function(type, ...args) {
	var typeMap = {
		player: Player,
		asteroid: Asteroid,
		grenade: Grenade,
		explosion: Explosion,
	};

	var Agent = typeMap[type];
	var agentList = this.getAgentList(type);
	if (!Agent) {
		console.log('bad agent type:', type);
		return null;
	}

	var newAgent = new Agent(...args);
	newAgent.key = this.nextAgentKey++;
	agentList.push(newAgent);

	return newAgent;
};

GameState.prototype.getAgent = function(type, key) {
	var agentList = this.getAgentList(type);
	if (!agentList) {
		return null;
	}

	for (var i = 0; i < agentList.length; i++) {
		if (agentList[i].key === key) {
			return agentList[i];
		}
	}
};

GameState.prototype.removeAgent = function(type, key) {
	var agentList = this.getAgentList(type);
	if (!agentList) {
		console.log('bad agent type:', type);
		return null;
	}

	for (var i = 0; i < agentList.length; i++) {
		if (agentList[i].key === key) {
			agentList.splice(i, 1);
			return;
		}
	}
};

module.exports = GameState;
