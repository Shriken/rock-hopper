'use strict';

var Victor = require('victor');
var sha1 = require('sha1');

var renderUtils = require('./renderUtils');

var Player = {};

Player.from = function(player) {
	var pos = player.pos;
	player.pos = new Victor(pos.x, pos.y);

	var upDir = player.upDirection;
	if (upDir) {
		player.upDirection = new Victor(upDir.x, upDir.y);
	}

	player.render = Player.render;

	var hash = sha1(player.key);
	player.color = '#' + hash.slice(0, 6);

	return player;
};

Player.render = function(ctx) {
	ctx.fillStyle = this.color;
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Player;
