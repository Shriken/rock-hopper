'use strict';

var addMixin = require('./addMixin');

// requires circleTime to be set in constructor
var Circler = {};

Circler.circle = function(circleParent, circleTime) {
	var circleCenter = circleParent.pos;

	var newPos = this.pos.clone()
		.subtract(circleCenter)
		.rotate((2 * Math.PI) / circleTime)
		.add(circleCenter);

	this.vel = newPos.subtract(this.pos);
};

module.exports = {
	mixInto: objectClass => addMixin(Circler, objectClass),
};
