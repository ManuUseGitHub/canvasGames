import { getTranslation } from "../Drawings/common";
import { CELL_H, CELL_H_COUNT, CELL_W, CELL_W_COUNT, CURVE_H_DEPTH, RESERVE_H, RESERVE_W } from "./constantes";
import { ApplicationContextType, BoundingBox, Point, TranslateTupples } from "./types";

export const gridCorner = (): { x: any; y: any; } => {

    const { x, y } = getTranslation();

    return {
        x: (x - (CELL_W * CELL_W_COUNT) / 2),
        y: (y - (CELL_H * CELL_H_COUNT) / 2)
    }
}

export const interpolate = (gCoords: Point, coords: Point) => {
    const { x, y } = gCoords;
    const { x: xc, y: yc } = coords;

    return {
        i: Math.floor((yc - y) / (CELL_H)),
        j: Math.floor((xc - x) / (CELL_W))
    }
}

export const getCoordsOfReserve = (p: Point, color: number) => {
    const { x, y } = p;
    return color === 0 ? {
        x: x - (CELL_W * 3 + 20),
        y
    } : {
        x: x + (CELL_W * CELL_W_COUNT) + 20,
        y: y + CELL_H * (CELL_H_COUNT - 3)
    }
}

export const smoothLowCurve = (x: number) => ((Math.pow(x - 75, 2)) / (150 + (75 * 3))) - CURVE_H_DEPTH;

export const flipMatrixVerticaly = (arr: any[][]) => {
    const h = arr.length;
    const l = arr[0].length;

    const result = Array(h).fill(Array(l));

    for (let i = 0; i < 3; ++i) {
        result[i] = arr[2 - i];
    }
    return result;
}

export const getNewPointOfReservedPieces = (cpt: number, p: Point, color: number) => {
    let { x, y } = p;

    const RESERVE_W_SPACE = 3 * CELL_W;
    const PIECE_W_SPACE = 4 * RESERVE_W;

    const marginW = (RESERVE_W_SPACE - PIECE_W_SPACE) / 2;
    
    const marginH = ((2 * CELL_H - (2 * (RESERVE_H - CURVE_H_DEPTH / 2))) / 2) + (CURVE_H_DEPTH / 2);

    const x3 = (cpt % 4) * 50;
    const curve = -([1, -1][color]) * smoothLowCurve(x3)

    x += marginW + (cpt % 4) * RESERVE_W;
    y += (marginH + ((Math.floor(cpt / 4)) * 85) - curve);
    return { x, y }
}

/**
 * Defines a set of translations for [X , Y] to apply to center the pieces gathering in the reserve
 * There you can find the pastilles (pills), pieces and text associated with each piece.
 * This function is needed because the pieces are drawn following a curve then they are centered relative
 * to an area having defined dimentions
 * 
 * @param p point corresponding to the left corner of the piece to draw in the reserve
 * @param pieceImage 
 * @returns 
 */
export const reserveTranslations = (p: Point, pieceImage: HTMLImageElement): TranslateTupples => {
    const { naturalWidth: width, naturalHeight: height } = pieceImage;
    const { x, y } = p;

    // delta computions
    const ΔY = (RESERVE_H - height) / 2;
    const ΔX = (RESERVE_W - width) / 2;

    return {
        pastille: [x + width - ΔX, y + height + ΔY],
        pieces: [x + ΔX + width / 2, y + ΔY + height / 2],
        texts: [x + width - ΔX - 7, y + height + ΔY + 7]
    }
}

export const inBox = (box: BoundingBox, p: Point) => {
    const { p1, p2 } = box;
    return (
        (p1.x <= p.x && p1.y <= p.y) &&
        (p2.x >= p.x && p2.y >= p.y)
    );
}

export const defined = (a: number, comparator1: string, x: number, comparator2: string, b: number) => {
    return !!eval(`${a} ${comparator1} ${x} && ${x} ${comparator2} ${b}`);
}

export const getInterpolatedScaledPoint = (p: Point, context: ApplicationContextType) => {
    const diffX = window.innerWidth - window.innerWidth * context.scale;
    const diffY = window.innerHeight - window.innerHeight * context.scale;

    return {
        x: ((p.x - diffX / 2) / context.scale),
        y: ((p.y - diffY / 2) / context.scale)
    }
}

export const translatedPoint = (p: Point, context: ApplicationContextType) => ({
    x: p.x - context.translation.x / context.scale,
    y: p.y - context.translation.y / context.scale
});

export const rescaledPoint = (p: Point, context: ApplicationContextType) => ({
    // TODO:  modify the calculus to correct the translation after a rescale
    x: p.x + context.translation.x / context.scale,
    y: p.y + context.translation.y / context.scale
});