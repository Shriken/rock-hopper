'use strict';

var Asteroid = require('./Asteroid');
var Grenade = require('./Grenade');
var Player = require('./Player');

var Renderer = function(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');

	this.ctx.translate(canvas.width / 2, canvas.height / 2);

	this.activePlayer = null;
};

Renderer.prototype.draw = function(gameState) {
	var ctx = this.ctx;
	this.clear(ctx, this.canvas.width, this.canvas.height);
	ctx.save();

	if (!gameState || !this.activePlayer) {
		return;
	}

	var player = gameState.getPlayer(this.activePlayer);
	if (player) {
		var playerPos = player.pos;
		ctx.translate(-playerPos.x, -playerPos.y);
	}

	gameState.asteroids.forEach(astrd => Asteroid.render(ctx, astrd));
	gameState.grenades.forEach(grenade => Grenade.render(ctx, grenade));
	gameState.players.forEach(player => Player.render(ctx, player));

	ctx.restore();
};

Renderer.prototype.clear = function(ctx, width, height) {
	ctx.clearRect(-width / 2, -height / 2, width, height);
};

module.exports = Renderer;
