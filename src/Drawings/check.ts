import { Point } from "../resources/types";

const Φ = 50

export const pulseSeconds = (ctx: any, p: Point, frameCount: number) => {
    const { x, y } = p;
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(x, y, Φ * absoluteSin(frameCount * 1), 0, 2 * Math.PI)
    ctx.stroke();
};

const absoluteSin = (x: number) =>
    Math.sin(x) ** 2;

