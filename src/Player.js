var Victor = require('victor');
var renderUtils = require('./renderUtils');
var Asteroid = require('./Asteroid');

//Victor pos, Victor vel, flt radius, flt mass, Asteroid attachedParent
var Player = function(pos, vel=(new Victor(0, 0)), mass=1, radius=5) {
	this.pos = pos;
	this.vel = vel;
	this.radius = radius;
	this.mass = mass;
};

Player.prototype.update = function() {
	if(this.attachedParent) {
		console.log("attached to asteroid");
	} else {
		this.pos.add(this.vel);
	}
};

//Takes canvas context to render on
Player.prototype.render = function(ctx) {
	ctx.fillStyle = "#0F0";
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Player;
