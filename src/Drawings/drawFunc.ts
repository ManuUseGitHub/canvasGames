import { resizeCanvasToDisplaySize } from "../components/Canvas/Aspect/size";
import { Point } from "../resources/types";

export const draw = (ctx: any, frameCount: number, p: Point, draws: any) => {
    resizeCanvasToDisplaySize(ctx.canvas);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    draws.forEach((fx: { (...params: any): void }) => {
        fx(ctx, p, frameCount);
    })
}