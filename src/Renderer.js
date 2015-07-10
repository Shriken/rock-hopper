var Renderer = function(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
};

Renderer.prototype.draw = function(gameState) {
	this.clear(this.ctx, this.canvas.width, this.canvas.height);

	for(var i = 0; i < gameState.entities.length; i++) {
		gameState.entities[i].render(this.ctx);
	}
};

Renderer.prototype.clear = function(ctx, width, height) {
	ctx.clearRect(0, 0, width, height);
};

module.exports = Renderer;
