var Victor = require('victor');
var Player = require('./Player');

var linkedPlayer = null;
var canvas = null;

function handleMDown(e) {
	console.log(e.button);
	if(e.button == 0) { //LMB
		var r = canvas.getBoundingClientRect();
		var mpos = new Victor(e.clientX - r.left, e.clientY - r.top);
		//console.log(mpos);
		var origin = new Victor(canvas.width / 2.0, canvas.height / 2.0);
		origin.add(linkedPlayer.pos);
		mpos.subtract(origin);
		mpos.normalize();
		mpos.multiply(new Victor(2, 2));
		linkedPlayer.vel.add(mpos);
	} else {
		//other buttons
	}
}
	
function init (c, lp) {
	linkedPlayer = lp;
	canvas = c;
	canvas.addEventListener('mousedown', handleMDown);
}


function update() {
	console.log("woop woop");
}

module.exports = {init:init, update:update};
