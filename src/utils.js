//graphics context, Victor center of circle, radius in pixels
var fillCircle = function(ctx, center, radius) {
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = "#631";
	ctx.fill();
}

var clear = function(ctx, width, height) {
	ctx.clearRect(0, 0, width, height);
}

module.exports = {
	fillCircle: fillCircle,
	clear: clear,
};
