import { resizeCanvasToDisplaySize } from "../CanvasProperties";
import { getCell } from "../business/game";
import { getPossibleMoves } from "../business/moves";
import { packForGridDraw } from "../resources/builders";
import { CELL_W, CELL_H, CELL_W_COUNT, CELL_H_COUNT, _π, BLOCKED_MOVE, UNDROPABLE_MOVE } from "../resources/constantes";
import { gridCorner } from "../resources/mathsHelper";
import { DROP_RESTRICTION } from "../resources/messageConstants";
import { pushDebugMessage } from "../resources/textHelper";
import { ApplicationContextType, GamePiece, PieceMove, Point } from "../resources/types";
import { drawBordCells, drawReserve, drawSelectedCell, drawPieceMoves, drawParallelYLines, drawBigLines, drawStarsOnBoard, drawDropRestrictionCell } from "./board";
import { initializeArrayWithValues } from "./common";
import { drawBundle, drawGamePieces, isSameAllyPiece } from "./pieces";

export const clearView = (ctx: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#eebb77'
    ctx.beginPath()
    //ctx.arc(position.x, position.y, 50 * Math.sin(frameCount * 0.05) ** 2, 0, _2π)
    ctx.fill();
}
export const drawGame = (ctx: any, context: ApplicationContextType) => {
    onRedrawable(context, () => {

        const { x, y } = gridCorner()

        resizeCanvasToDisplaySize(ctx.canvas);

        const diffX = window.innerWidth - window.innerWidth * context.scale;
        const diffY = window.innerHeight - window.innerHeight * context.scale;
        clearView(ctx);
        ctx.save()
        ctx.translate(
            context.translation.x + diffX / 2, context.translation.y + diffY / 2
        )
        ctx.scale(context.scale, context.scale);

        drawBordCells(ctx, x, y, context);
        drawReserve(ctx, { x, y }, context);
        drawHints(ctx, { x, y }, context);
        drawParallelYLines(packForGridDraw(x, y, ctx, CELL_W, CELL_H, CELL_W_COUNT, CELL_H_COUNT), context);
        drawBigLines(packForGridDraw(x, y, ctx, CELL_W, CELL_H, CELL_W_COUNT, CELL_H_COUNT), context);
        drawStarsOnBoard(packForGridDraw(x, y, ctx), context);
        drawGamePieces(ctx, x, y, context);
        drawBundle(ctx, x, y, context);
        ctx.restore()
        //drawTextWithLineFeeds(ctx, { x: 0, y: 50 }, context.debug);
    })
}

export const onRedrawable = (context: ApplicationContextType, cb: () => void) => {
    if (context && (context.animating || context.frames < 1)) {
        cb();
        frameUp(context);
    }
}

export const frameUp = (context: ApplicationContextType) => {
    if (!context.animating) {
        context.setFrames(context.frames++);
    }
}

export const drawHints = (ctx: any, p: Point, context: ApplicationContextType) => {
    const { x, y } = p;
    const cell = getCell(context.coords, context);
    if (cell !== null) {
        const { i, j } = cell;
        drawSelectedCell(ctx, x, y, { i, j }, context);
        drawPieceMoves(packForGridDraw(x, y, ctx), { i, j }, context);
    }
    if (context.pieceOfReserve  && context.mouseIsDown) {
        const piece = context.pieceOfReserve.element;
        const game = context.gamePieces.game;
        const badMoves = drawBadDropMovesOfPawns(ctx,p,piece,game)
        
        context.setBadDropMoves(badMoves);
        //pushDebugMessage(context, DROP_RESTRICTION, [JSON.stringify(badMoves)])
    }
}
function drawBadDropMovesOfPawns(ctx: any, p: Point, piece: GamePiece, game:GamePiece[]) {
    if (piece.symbol === "p") {
        const { x, y } = p;
        const pawnPositions: number[][] = []
        const badMoves = getBadDropMoves(piece, pawnPositions,game);

        pawnPositions.forEach((a) => {
            drawDropRestrictionCell(ctx, x, y, { i: a[0], j: a[1] }, BLOCKED_MOVE)
        })
        badMoves.forEach((a) => {
            drawDropRestrictionCell(ctx, x, y, { i: a[0], j: a[1] }, UNDROPABLE_MOVE)
        })
        return badMoves;
    }
    return [];
}
function getBadDropMoves(piece: GamePiece, obstrictiblePiecePositions: number[][], pieces: GamePiece[]): number[][] {
    const foeLine = [8, 0][piece.color];
    const badMoves: number[][] = [];

    let badColumns: number[] = Array.from(Array(CELL_W_COUNT).keys());
    
    pieces.filter((p) =>{return isSameAllyPiece(p, piece)})
        .forEach(p => {
            if (!badMoves.find(n => n[1] === p.j)) {
                for (let i = 0; i < CELL_H_COUNT; ++i) {
                    if (p.i == i) {
                        obstrictiblePiecePositions.push([i, p.j]);
                    } else { badMoves.push([i, p.j]) }
                }
            }
        });
    badMoves.forEach(m => {
        badColumns = badColumns.filter(j => j !== m[1])
    })
    badColumns.forEach(c => {
        badMoves.push([foeLine, c])
    });
    
    return badMoves;
}