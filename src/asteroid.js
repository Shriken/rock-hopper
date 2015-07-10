var renderUtils = require('./renderUtils');

//Victor center of orbit, Victor starting position, radius in pixels, orbital period in frames
var Asteroid = function(center, pos, radius, orbit_time) {
	//center of orbit
	this.center = center;
	//current position
	this.pos = pos;
	this.radius = radius;
	this.orbit_time = orbit_time;
}

Asteroid.prototype.update = function() {
	this.pos.subtract(this.center);	

	//Victor rotate and rotateby functions dont work properly, had to write my own
	var new_angle = this.pos.angle() + (2 * Math.PI) / this.orbit_time;
	var length = this.pos.length();
	this.pos.x = length * Math.cos(new_angle);
	this.pos.y = length * Math.sin(new_angle);

	this.pos.add(this.center);
}

//Takes canvas context to render on
Asteroid.prototype.render = function(ctx) {
	renderUtils.fillCircle(ctx, this.pos, this.radius);
}

module.exports = Asteroid;
