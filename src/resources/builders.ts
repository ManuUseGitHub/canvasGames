import { LineDrawPack, GridDrawPack, ReservePieceDrawPack, TranslateTupples, ApplicationContextType, PiecesZone, Point } from "./types"

export const packForLineDraw = (
    ctx: any,
    x: number,
    y: number,
    spacing: number,
    width: number = 0,
    height: number = 0,
    i: number = 0): LineDrawPack => (
    { ctx, x, y, spacing, width, height, i } as LineDrawPack
);

export const packForGridDraw = (
    x: number,
    y: number,
    ctx: any,
    width: number = 0,
    height: number = 0,
    cellCountX: number = 0,
    cellCountY: number = 0,
    padding: number = 0): GridDrawPack => (
    { x, y, ctx, width, height, cellCountX, cellCountY, padding } as GridDrawPack
);


export const PackForReservePieceDraw = (
    ctx: any,
    color: number,
    cpt: number,
    key: string,
    symbol: string,
    p2: Point,
    translations: TranslateTupples,
    pieceImage: HTMLImageElement,
    reserved: PiecesZone,
    context: ApplicationContextType): ReservePieceDrawPack => (
    { ctx, color, cpt, key, symbol,p2, translations, pieceImage, reserved, context } as ReservePieceDrawPack
);