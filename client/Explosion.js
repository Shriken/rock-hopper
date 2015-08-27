'use strict';

var Victor = require('victor');

var renderUtils = require('./renderUtils');

var EXPLOSION_RAD = 40;
var EXPLOSION_COLOR = '#a53';

var Explosion = {};

Explosion.from = function(explosion) {
	var pos = explosion.pos;
	explosion.pos = new Victor(pos.x, pos.y);

	return explosion;
};

Explosion.render = function(ctx, explosion) {
	ctx.fillStyle = EXPLOSION_COLOR;
	renderUtils.fillCircle(ctx, explosion.pos, EXPLOSION_RAD);
};

module.exports = Explosion;
