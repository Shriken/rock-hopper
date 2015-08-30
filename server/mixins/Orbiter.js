'use strict';

var addMixin = require('./addMixin');

// requires orbitTime to be set in constructor
var Orbiter = {};

Orbiter.update = function(oldFunc) {
	if (this.orbitParent) {
		var orbitCenter = this.orbitParent.pos;

		var newPos = this.pos.clone()
			.subtract(orbitCenter)
			.rotate((2 * Math.PI) / this.orbitTime)
			.add(orbitCenter);

		this.vel = newPos.subtract(this.pos);
	}

	this.pos += this.vel;
	oldFunc();
};

module.exports = {
	add: objectClass => addMixin(Orbiter, objectClass),
};
