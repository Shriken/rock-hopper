var renderUtils = require('./renderUtils');

var Asteroid = function(orbitCenter, pos, radius, orbit_time) {
	this.orbitCenter = orbitCenter;
	this.pos = pos;
	this.radius = radius;
	this.orbit_time = orbit_time;
};

Asteroid.prototype.update = function() {
	this.pos.subtract(this.orbitCenter);	

	this.pos.rotate((2 * Math.PI) / this.orbit_time);

	this.pos.add(this.orbitCenter);
};

//Takes canvas context to render on
Asteroid.prototype.render = function(ctx) {
	renderUtils.fillCircle(ctx, this.pos, this.radius);
};

module.exports = Asteroid;
