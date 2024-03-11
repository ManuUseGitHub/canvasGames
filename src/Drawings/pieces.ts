
import { packForGridDraw } from "../resources/builders";
import { BLOCKED_MOVE, RESERVE_H, WHITE, _2π } from "../resources/constantes";
import { getSelectionImage, images } from "../resources/images";
import { getCoordsOfReserve, getNewPointOfReservedPieces, reserveTranslations } from "../resources/mathsHelper";
import { ApplicationContextType, GamePiece, Point, TranslateTupples } from "../resources/types";
import { applyRotation, createReserve, transform } from "./common";
import { pieceCoords } from "./coordinates";

export const drawGamePieces = (ctx: any, x: number, y: number, context: ApplicationContextType) => {
    const game = context.gamePieces.game;

    for (let ni = 0; ni < game.length; ++ni) {

        const { i, j, symbol } = game[ni];
        if (i >= 0 && j >= 0) {
            const pieceImage = images[symbol]
            let { x2, y2 } = pieceCoords({ x, y }, { i, j }, pieceImage);

            const rotate = game[ni].color === 0;
            applyRotation(packForGridDraw(x, y, ctx, pieceImage.naturalWidth, pieceImage.naturalHeight), rotate, context, () => {
                if (rotate) {
                    x2 = x2 * -1;
                    y2 = y2 * -1
                }
                ctx.drawImage(pieceImage, x2, y2, pieceImage.naturalWidth, pieceImage.naturalHeight);
            });
        }
    }
}

export const drawCountBadges = (ctx: any, x: number, y: number, reserved: {
    [x: string]: GamePiece[];
}) => {
    let cpt = 0;
    for (let key in reserved) {
        prepareDrawing({ x, y }, reserved, key, cpt, (pieceImage: HTMLImageElement, translations: TranslateTupples, symbol: string) => {
            if (reserved[symbol].length > 1) {
                drawRotatedBadges(ctx, cpt, pieceImage, translations);
                drawRotatedCount(ctx, reserved[symbol], translations);
            }
        });

        cpt++
    }
}


export const prepareDrawing = (p: Point, reserved: {
    [x: string]: GamePiece[];
}, key: string, cpt: number, cb: (pieceImage: HTMLImageElement, translations: TranslateTupples, symbol: string, p2: Point) => void) => {
    const { symbol, color } = reserved[key][0];
    const pieceImage = images[symbol];
    const { x, y } = p;

    let p1 = getCoordsOfReserve({ x, y }, color);
    const p2 = getNewPointOfReservedPieces(cpt, p1, color)

    const line = Math.floor(Object.keys(reserved).length / 2);
    const t = line * RESERVE_H/2

    const translations: TranslateTupples = reserveTranslations(p2, pieceImage);
    cb(pieceImage, translations, symbol, p2);
}

export const drawRotatedBadges = (ctx: any, cpt: number, pieceImage: HTMLImageElement, translations: TranslateTupples) => {
    const { pastille } = translations;
    transform(ctx, () => {
        ctx.fillStyle = BLOCKED_MOVE;
        ctx.beginPath();
        ctx.translate(...pastille)
        ctx.arc(0, 0, 15, 0, _2π);
        ctx.closePath();
        ctx.fill();
    })
}

export const drawRotatedPieces = (ctx: any, cpt: number, pieceImage: HTMLImageElement, color: number, translations: TranslateTupples) => {
    const { pieces } = translations;
    transform(ctx, () => {

        const rotations = [
            [180 - 25, 180 - 7.5, 180 - -7.5, 180 - -25],
            [25, 7.5, -7.5, -25]
        ][color]

        ctx.translate(...pieces)
        ctx.rotate(Math.PI / 180 * (rotations[cpt % 4]));
        ctx.translate(-pieceImage.naturalWidth / 2, -pieceImage.naturalHeight / 2)
        //ctx.fillRect( 0, 0, RESERVE_W,RESERVE_W)
        ctx.drawImage(pieceImage, 0, 0, pieceImage.naturalWidth, pieceImage.naturalHeight);
        
    })
}

export const drawRotatedCount = (ctx: any, pieces: GamePiece[], translations: TranslateTupples) => {
    const { texts } = translations;
    transform(ctx, () => {
        ctx.fillStyle = WHITE;
        ctx.font = `25px arial`;
        ctx.translate(...texts)
        ctx.fillText(`${pieces.length}`, 0, 0);
    });
}

export const drawPieces = (ctx: any, x: number, y: number, reserved: {
    [x: string]: GamePiece[];
}, color: number, context: ApplicationContextType) => {
    let cpt = 0;
    for (let key in reserved) {
        prepareDrawing({ x, y }, reserved, key, cpt, (pieceImage: HTMLImageElement, translations: TranslateTupples, symbol: string, p: Point) => {
            drawRotatedPieces(ctx, cpt, pieceImage, color, translations);
            drawSelect(ctx, color, cpt, key, symbol, translations, context);
        });

        cpt++
    }
}

export const drawBundle = (ctx: any, x: number, y: number, context: ApplicationContextType) => {
    const reserved = createReserve(context.gamePieces.game);
    for (let color = 0; color < 2; ++color) {
        drawPieces(ctx, x, y, reserved[color], color, context);
        drawCountBadges(ctx, x, y, reserved[color]);
    }
}

const drawSelect = (
    ctx: any,
    color: number,
    cpt: number,
    key: string,
    symbol: string,
    translations: TranslateTupples,
    context: ApplicationContextType
) => {
    if (isHighLightableReservePiece(color, key, context)) {
        const selectionImage = getSelectionImage(symbol);
        drawRotatedPieces(ctx, cpt, selectionImage, color, translations);
    }
};

const isHighLightableReservePiece = (color: number, key: string, context: ApplicationContextType) =>
    !context.mouseIsDragging &&
    context.pieceOfReserve &&
    key === context.pieceOfReserve.element.symbol &&
    context.pieceOfReserve.element.color === color;

export const isSameAllyPiece = (a: GamePiece, b: GamePiece) =>
    a.color === b.color &&
    a.i !== -1 && a.j !== -1 &&
    a.symbol === b.symbol;
