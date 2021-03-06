'use strict';

var Victor = require('victor');

var renderUtils = require('./renderUtils');

var GRENADE_RAD = 4;
var GRENADE_COLOR = '#c00';

var Grenade = {};

Grenade.from = function(grenade) {
	var pos = grenade.pos;
	grenade.pos = new Victor(pos.x, pos.y);

	var vel = grenade.vel;
	grenade.vel = new Victor(vel.x, vel.y);

	return grenade;
};

Grenade.render = function(ctx, grenade) {
	ctx.fillStyle = GRENADE_COLOR;
	renderUtils.fillCircle(ctx, grenade.pos, GRENADE_RAD);
};

module.exports = Grenade;
