'use strict';

var Renderer = function(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');

	this.ctx.translate(canvas.width / 2, canvas.height / 2);

	this.activePlayer = null;
};

Renderer.prototype.draw = function(gameState) {
	if (!gameState || !this.activePlayer) {
		return;
	}

	var ctx = this.ctx;

	this.clear(ctx, this.canvas.width, this.canvas.height);

	ctx.save();
	var player = null;
	for (var i = 0; i < gameState.players.length; i++) {
		var thisPlayer = gameState.players[i];
		if (thisPlayer.key == this.activePlayer) {
			player = thisPlayer;
			break;
		}
	}

	if (!player) {
		return;
	}

	if (gameState.players.length > 0) {
		var playerPos = player.pos;
		ctx.translate(-playerPos.x, -playerPos.y);
	}

	for (var i = 0; i < gameState.asteroids.length; i++) {
		gameState.asteroids[i].render(ctx);
	}
	for (var i = 0; i < gameState.players.length; i++) {
		gameState.players[i].render(ctx);
	}

	ctx.restore();
};

Renderer.prototype.clear = function(ctx, width, height) {
	ctx.clearRect(-width / 2, -height / 2, width, height);
};

module.exports = Renderer;
