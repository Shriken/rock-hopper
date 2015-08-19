'use strict';

var express = require('express');
var http = require('http');
var socketIo = require('socket.io');

var app = express();
var appServer = http.Server(app);
var io = socketIo(appServer);

var Simulator = require('./server_build/Simulator');

app.use('/public/', express.static('public'));
app.get('/', function(req, res) {
	res.sendFile('./public/index.html', { root: __dirname });
});

io.on('connect', function(socket) {
	var key = Simulator.addPlayer();
	socket.emit('set-key', key);
	console.log('client connected:', key);

	socket.on('jump', function(direction) {
		Simulator.playerAction(key, 'jump', direction);
	});

	socket.on('disconnect', function() {
		Simulator.removePlayer(key);
		console.log('client disconnected:', key);
	});
});

appServer.listen(8000);

Simulator.run(function(gameState) {
	io.emit('server-tick', JSON.parse(JSON.stringify(gameState)));
});
