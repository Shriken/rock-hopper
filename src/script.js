var Util = new Object();
var RH = new Object();

//graphics context, Victor center of circle, radius in pixels
Util.fill_circle = function(ctx, center, radius) {
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = "#631";
	ctx.fill();
}

Util.clear = function(ctx) {
	ctx.clearRect(0, 0, RH.canvas.width, RH.canvas.height);
}


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

	temp_ast = new Asteroid(RH.center.clone(), new Victor(500, 80), 10, 40);
	list.push(temp_ast);

	temp_ast = new Asteroid(RH.center.clone(), new Victor(500, 200), 20, 160);
	list.push(temp_ast);

	temp_ast = new Asteroid(RH.center.clone(), new Victor(100, 400), 10, 20);
	list.push(temp_ast);
}

//main loop
RH.loop = function() {
	console.log("boop");

	RH.update();
	RH.draw();

	setTimeout("RH.loop()", 50);
}

RH.update = function() {
	for(var i = 0; i < RH.entities.length; i++) {
		RH.entities[i].update();
	}
}

RH.draw = function() {
	var ctx = RH.canvas.getContext("2d");
	Util.clear(ctx);
	for(var i = 0; i < RH.entities.length; i++) {
		RH.entities[i].render(ctx);
	}
}
