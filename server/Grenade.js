'use strict';

var Victor = require('victor');

var Grenade = function(pos, vel=new Victor(0, 0)) {
	this.pos = pos;
	this.vel = vel;
};

Grenade.prototype.update = function() {
	this.pos.add(this.vel);
};

module.exports = Grenade;
