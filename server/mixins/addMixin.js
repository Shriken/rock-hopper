'use strict';

/* takes a class and adds the mixin functions to it,
 * wrapping where necesssary
 */
var addMixin = function(mixin, objectClass) {
	for (var funcName in mixin) {
		if (funcName in objectClass.prototype) {
			console.log('WARNING: clobbering func', funcName);
		}

		objectClass.prototype[funcName] = mixin[funcName];
	}
};

module.exports = addMixin;
