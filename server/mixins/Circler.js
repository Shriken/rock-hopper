'use strict';

var Victor = require('victor');

var addMixin = require('./addMixin');

// requires circleTime to be set in constructor
var Circler = {};

Circler.circle = function(circleParent, circleTime, circleRad) {
	if (circleParent && circleTime) {
		var rotDir = new Victor(1, 0).rotate(this.orbitAngle);
		this.orbitAngle += 2 * Math.PI / circleTime;

		var circleCenter = circleParent.pos;
		var newPos = rotDir
			.multiply(new Victor(circleRad, circleRad))
			.add(circleCenter);

		this.vel = newPos.subtract(this.pos);
	}
};

module.exports = {
	mixInto: objectClass => addMixin(Circler, objectClass),
};
