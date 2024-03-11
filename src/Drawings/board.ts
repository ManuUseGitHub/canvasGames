import { findPiece } from "../business/game";
import { getPossibleMoves } from "../business/moves";
import { packForGridDraw, packForLineDraw } from "../resources/builders";
import { BOARD_STROKE_COLOR, CELL_W_COUNT, CELL_H_COUNT, CELL_W, CELL_H, _2π, BOARD_SELECT_COLOR, FREE_MOVE, BOARD_BG_COLOR, BLOCKED_MOVE, UNDROPABLE_MOVE } from "../resources/constantes";
import { getCoordsOfReserve } from "../resources/mathsHelper";
import { LineDrawPack, ApplicationContextType, GridDrawPack, CellAddress, Point, GamePiece } from "../resources/types";
import { hexcolorToRGBCSSString, getAllyOrFoeColor } from "./colors";
import { drawReserveGiantPiece } from "./reserve";


export const drawHorizontalLine = (ld: LineDrawPack) => {
    const { ctx, x, y, spacing, width, i } = ld
    const delta = i * spacing;
    ctx.moveTo(x, y + delta);
    ctx.lineTo(x + width, y + delta);
}

export const drawVerticalLine = (ld: LineDrawPack) => {
    const { ctx, x, y, spacing, height, i } = ld
    const delta = i * spacing;
    ctx.moveTo(x + delta, y);
    ctx.lineTo(x + delta, y + height);
}

export const startDrawStrokes = (ctx: any, lineWidth: number, strokeHexColor: string, cb: () => void, context: ApplicationContextType) => {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = hexcolorToRGBCSSString(strokeHexColor);
    cb();
    ctx.stroke();
    ctx.closePath();
}


export const drawParallelYLines = (gd: GridDrawPack, context: ApplicationContextType) => {
    const { ctx, x, y, width: gridCellWidth, height: gridCellHeight, cellCountX, cellCountY } = gd;

    const width = gridCellWidth * cellCountX;
    const height = gridCellHeight * cellCountY;

    startDrawStrokes(ctx, 1, BOARD_STROKE_COLOR, () => {
        let i = 1;
        for (; i < cellCountY; ++i) {
            drawHorizontalLine(packForLineDraw(ctx, x, y, gridCellHeight, width, 0, i))
        }
        for (let i = 1; i < cellCountX; ++i) {
            drawVerticalLine(packForLineDraw(ctx, x, y, gridCellWidth, 0, height, i))
        }
    }, context);
}
export const drawBigLines = (gd: GridDrawPack, context: ApplicationContextType) => {
    const { ctx, x, y, width: gridCellWidth, height: gridCellHeight, cellCountX, cellCountY } = gd;

    const width = gridCellWidth * cellCountX;
    const height = gridCellHeight * cellCountY;

    startDrawStrokes(ctx, 2, BOARD_STROKE_COLOR, () => {
        for (let i = 0; i <= cellCountX; i += 3) {
            drawHorizontalLine(packForLineDraw(ctx, x, y, gridCellHeight, width, 0, i));
            drawVerticalLine(packForLineDraw(ctx, x, y, gridCellWidth, 0, height, i))
        }
    }, context);
}

export const drawStarsOnBoard = (gd: GridDrawPack, context: ApplicationContextType) => {
    const { x, y, ctx } = gd;
    ctx.fillStyle = BOARD_STROKE_COLOR;
    for (let i = 3; i < CELL_W_COUNT; i += 3) {
        for (let j = 3; j < CELL_H_COUNT; j += 3) {
            ctx.beginPath();
            ctx.arc(x + CELL_W * i, y + CELL_H * j, 5, 0, _2π);
            ctx.closePath();
            ctx.fill();
        }
    }
}

export const drawCell = (gd: GridDrawPack, cell: CellAddress, color: string) => {
    const { x, y, ctx, width: gridCellWidth, height: gridCellHeight, padding } = gd;
    const { i, j } = cell;
    ctx.fillStyle = color;
    const xPadded = (x + gridCellWidth * j) + padding;
    const yPadded = (y + gridCellHeight * i) + padding;
    const wPadded = gridCellWidth - padding * 2;
    const hPadded = gridCellHeight - (padding * 2);
    ctx.fillRect(xPadded, yPadded, wPadded, hPadded);
}

export const drawSelectedCell = (ctx: any, x: number, y: number, cell: CellAddress, context: ApplicationContextType) => {
    const { i, j } = cell;

    const found = findPiece(cell,context.gamePieces);
    const color = context.badDropMoves
        .find(m => (found !== undefined || m[0] === i && m[1] === j)) ? BLOCKED_MOVE : BOARD_SELECT_COLOR;

    drawCell(packForGridDraw(x, y, ctx, CELL_W, CELL_H, 0, 0, 5), { i, j }, color)
}

export const drawMoveCell = (ctx: any, x: number, y: number, cell: CellAddress, context: ApplicationContextType) => {
    const { i, j } = cell;

    const color = findPiece(cell, context.gamePieces) === undefined ? FREE_MOVE : getAllyOrFoeColor(cell, context);
    drawCell(packForGridDraw(x, y, ctx, CELL_W, CELL_H), { i, j }, color)
}

export const drawDropRestrictionCell = (ctx: any, x: number, y: number, cell: CellAddress, fill: string) => {
    drawCell(packForGridDraw(x, y, ctx, CELL_W, CELL_H), cell, fill)
}

export const drawBordCells = (ctx: any, x: number, y: number, context: ApplicationContextType) => {
    drawCell(packForGridDraw(x, y, ctx, CELL_W * CELL_W_COUNT, CELL_H * CELL_H_COUNT, 0, 0, -5), { i: 0, j: 0 }, BOARD_BG_COLOR)
}

export const drawReserve = (ctx: any, p: Point, context: ApplicationContextType) => {

    for (let color = 0; color < 2; ++color) {
        let { x, y } = getCoordsOfReserve(p, color)

        drawCell(packForGridDraw(x, y, ctx, CELL_W * 3, CELL_H * 3, 0, 0, -5), { i: 0, j: 0 }, BOARD_BG_COLOR);
        const width = CELL_W * 3;
        const height = CELL_H * 3;

        startDrawStrokes(ctx, 2, BOARD_STROKE_COLOR, () => {
            for (let i = 0; i <= 3; i += 3) {
                drawHorizontalLine(packForLineDraw(ctx, x, y, CELL_H, width, 0, i));
                drawVerticalLine(packForLineDraw(ctx, x, y, CELL_W, 0, height, i))
            }
        }, context);

        drawReserveGiantPiece(ctx, { x, y }, width, height, color, context);
    }
}
export const drawPieceMoves = (gd: GridDrawPack, cell: CellAddress, context: ApplicationContextType) => {
    const piece = context.selectedGamePiece;
    if (piece && piece.id != undefined) {

        const moves = getPossibleMoves(piece, context);
        const { ctx, x, y } = gd;
        for (let index = 0; index < moves.length; ++index) {
            const { i, j } = moves[index];
            drawMoveCell(ctx, x, y, { i, j }, context);
        }
    }
}
