import { _2π } from "../resources/constantes";
import { images } from "../resources/images";
import { Point, ApplicationContextType } from "../resources/types";
import { transform } from "./common";

export const drawReserveGiantPiece = (ctx: any, p: Point, width: number, height: number, color: number, context: ApplicationContextType) => {
    const shogi = images.shogi;

    if (color === 0) {
        drawRotatedGiantPiece(ctx, p, width, height, shogi, context);
    } else {
        drawGiantPiece(ctx, p, width, height, shogi, context);
    }
}
export const drawGiantPiece = (ctx: any, p: Point, width: number, height: number, shogi: HTMLImageElement, context: ApplicationContextType) => {
    const { x, y } = p;
    ctx.drawImage(shogi,
        x + (width - shogi.naturalWidth) / 2,
        y + (height - shogi.naturalHeight) / 2,
        shogi.naturalWidth,
        shogi.naturalHeight
    );
}

export const drawRotatedGiantPiece = (ctx: any, p: Point, width: number, height: number, shogi: HTMLImageElement, context: ApplicationContextType) => {
    const { x, y } = p;
    const deltax = (width - shogi.naturalWidth) / 2;
    const deltay = (height - shogi.naturalHeight) / 2;

    transform(ctx, () => {
        ctx.translate(x, y)
        ctx.rotate(_2π / 2)
        ctx.translate(-shogi.naturalWidth - deltax, -shogi.naturalHeight - deltay)
        ctx.drawImage(shogi, 0, 0, shogi.naturalWidth,shogi.naturalHeight);
    })
}