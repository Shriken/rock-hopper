"use strict";

var express = require('express');
var Simulator = require('./server_build/Simulator');

var app = express();

app.use('/public/', express.static('public'));
app.get('/', function(req, res) {
	res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(8000);

Simulator.run(function() {
});
