'use strict';

var socketIo = require('socket.io-client');
var readline = require('readline-sync');

var promptForKey = function() {
	var adminKey = readline.question('input admin key: ');
	socket.emit('auth', adminKey);
};

console.log('connecting...');
var socket = socketIo('http://localhost:9000');

// socket configuration
socket.on('connect', function() {
	console.log('connected!');
	promptForKey();
});

socket.on('auth-success', function() {
	console.log('good auth');
	consolePrompt();
});

socket.on('auth-fail', function() {
	console.log('bad key');
	promptForKey();
});

// prompt logic
var consolePrompt = function() {
	var command;
	while (true) {
		command = readline.question('> ');
		if (!command || command === 'quit') {
			break;
		}

		command = command.split(' ');
		socket.emit('command', command);
	}

	process.exit();
};
