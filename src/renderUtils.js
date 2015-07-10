var fillCircle = function(ctx, center, radius) {
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = "#631";
	ctx.fill();
};

module.exports = {
	fillCircle: fillCircle,
};
