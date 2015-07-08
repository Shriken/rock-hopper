var Victor = require('victor');

var utils = require('./utils');
var config = require('./config');
var Asteroid = require('./Asteroid');

var RH = {};


//main namespace

RH.init = function() {
	RH.canvas = document.getElementById("canvas");
	RH.bounds = new Victor(RH.canvas.width, RH.canvas.height);
	RH.center = RH.bounds.clone().divide(new Victor(2,2));
	RH.entities = [];
	

	RH.init_asteroids(RH.entities);


	RH.loop();
}

//add asteroids to list
RH.init_asteroids = function(list) {
	//TEMPORARY
	//for(var i = 0; i < 4; i++);
	var temp_ast;

	list.push(new Asteroid(
		RH.center.clone(),
		new Victor(500, 80),
		10, 120
	));

	list.push(new Asteroid(
		RH.center.clone(),
		new Victor(500, 200),
		20, 480
	));

	list.push(new Asteroid(
		RH.center.clone(),
		new Victor(100, 400),
		10, 60
	));

	list.push(new Asteroid(
		RH.center.clone(),
		RH.center.clone(),
		30, 1
	));
}

//main loop
RH.loop = function() {
	console.log("boop");

	RH.update();
	RH.draw();

	setTimeout(RH.loop, 1000 / config.fps);
}

RH.update = function() {
	for(var i = 0; i < RH.entities.length; i++) {
		RH.entities[i].update();
	}
}

RH.draw = function() {
	var ctx = RH.canvas.getContext("2d");
	utils.clear(ctx, RH.canvas.width, RH.canvas.height);
	for(var i = 0; i < RH.entities.length; i++) {
		RH.entities[i].render(ctx);
	}
}

document.body.onload = RH.init;
