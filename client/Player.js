'use strict';

var Victor = require('victor');
var sha1 = require('sha1');

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

	var hash = sha1(playerData.key);
	playerData.color = '#' + hash.slice(0, 6);

	return playerData;
};

Player.render = function(ctx) {
	ctx.fillStyle = this.color;
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Player;
