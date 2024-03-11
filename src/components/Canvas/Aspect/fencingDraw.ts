export const predraw = (context: any) => {
	
    context.save()
	const { width, height } = context.canvas
	context.clearRect(0, 0, width, height)
}

export const postdraw = (ctx: any) => {
	ctx.restore()
}

export const clearView = (ctx: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#eebb77'
    ctx.beginPath()
    //ctx.arc(position.x, position.y, 50 * Math.sin(frameCount * 0.05) ** 2, 0, _2π)
    ctx.fill();
}