'use strict';

var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var sha1 = require('sha1');

var Simulator = require('./server_build/Simulator');

var adminKey = sha1(Math.random());
console.log('admin key:', adminKey);

var consoleServer = http.createServer();
var consoleSocket = socketIo(consoleServer);
var CONSOLE_SERVER_PORT = 9000;

consoleSocket.on('connect', function(socket) {
	var authed = false;

	socket.on('auth', function(key) {
		if (key === adminKey) {
			authed = true;
			socket.emit('auth-success');
		} else {
			socket.emit('auth-fail');
		}
	});
});

console.log('console server listening on port', CONSOLE_SERVER_PORT);
consoleServer.listen(CONSOLE_SERVER_PORT);

var app = express();
var appServer = http.Server(app);
var appSocket = socketIo(appServer);
var APP_SERVER_PORT = 8000;

app.use('/public/', express.static('public'));
app.get('/', function(req, res) {
	res.sendFile('./public/index.html', { root: __dirname });
});

appSocket.on('connect', function(socket) {
	var key = Simulator.addPlayer();
	socket.emit('set-key', key);
	console.log('client connected:', key);

	socket.on('jump-or-fire', function(direction) {
		Simulator.pushEvent('player', 'jump-or-fire', key, direction);
	});

	socket.on('disconnect', function() {
		Simulator.removePlayer(key);
		console.log('client disconnected:', key);
	});
});

console.log('app server listening on port', APP_SERVER_PORT);
appServer.listen(APP_SERVER_PORT);

Simulator.run(function(gameState) {
	appSocket.emit('server-tick', gameState);
});
