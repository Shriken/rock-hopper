'use strict';

var Victor = require('victor');

var renderUtils = require('./renderUtils');

var Player = {};

Player.from = function(playerData) {
	var pos = playerData.pos;
	playerData.pos = new Victor(pos.x, pos.y);

	var upDir = playerData.upDirection;
	if (upDir) {
		playerData.upDirection = new Victor(upDir.x, upDir.y);
	}

	playerData.render = Player.render;

	return playerData;
};

Player.render = function(ctx) {
	ctx.fillStyle = '#0d0';
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Player;
