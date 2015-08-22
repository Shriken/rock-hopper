'use strict';

var eventQueue = [];

var pushEvent = function(...args) {
	eventQueue.push(args);
};

var getNextEvent = function() {
	return eventQueue.shift();
}

module.exports = {
	pushEvent: pushEvent,
	getNextEvent: getNextEvent,
};
