'use strict';

var addMixin = require('./addMixin');

// requires orbitTime to be set in constructor
var Orbiter = {};

Orbiter.orbit = function() {
	if (this.orbitParent) {
		var orbitCenter = this.orbitParent.pos;

		var newPos = this.pos.clone()
			.subtract(orbitCenter)
			.rotate((2 * Math.PI) / this.orbitTime)
			.add(orbitCenter);

		this.vel = newPos.subtract(this.pos);
	}
};

module.exports = {
	mixInto: objectClass => addMixin(Orbiter, objectClass),
};
