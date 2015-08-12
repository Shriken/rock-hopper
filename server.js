"use strict";

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
	console.log('client connected');
	socket.on('disconnect', function() {
		console.log('client disconnected');
	});
});

appServer.listen(8000);

Simulator.run(function() {
	io.emit('server-tick');
});
