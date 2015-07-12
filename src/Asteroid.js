var Victor = require('victor');

var renderUtils = require('./renderUtils');

var Asteroid = function(orbitParent, pos, radius, orbit_time) {
	this.orbitParent = orbitParent;
	this.pos = pos;
	this.radius = radius;
	this.orbit_time = orbit_time;
};

Asteroid.prototype.update = function() {
	var orbitCenter;
	if (this.orbitParent) {
		orbitCenter = this.orbitParent.pos;
	} else {
		orbitCenter = new Victor(0, 0);
	}

	this.pos.subtract(orbitCenter);	
	this.pos.rotate((2 * Math.PI) / this.orbit_time);
	this.pos.add(orbitCenter);
};

//Takes canvas context to render on
Asteroid.prototype.render = function(ctx) {
	ctx.fillStyle = "#631";
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Asteroid;
