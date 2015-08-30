'use strict';

/* takes a class and adds the mixin functions to it,
 * wrapping where necesssary
 */
var addMixin = function(mixin, objectClass) {
	for (var funcName in mixin) {
		var newFuncInternal = mixin[funcName];
		var oldFunc = objectClass.prototype[funcName];
		oldFunc = oldFunc ? oldFunc : null;

		var newFunc = function(...args) {
			return newFuncInternal(oldFunc, ...args);
		};

		objectClass.prototype[funcName] = newFunc;
	}
};

module.exports = addMixin;
