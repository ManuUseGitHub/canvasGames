import { RESERVE_W, RESERVE_H, CELL_H, CELL_W, NOT_FOUND_INDEX, BOARD_GRAB_FROM, OUT_GRAB_FROM } from "../resources/constantes";
import { getCoordsOfReserve, gridCorner, inBox, translatedPoint } from "../resources/mathsHelper";
import { ApplicationContextType, BoundingBox, GamePiece, Point, ReserveSelect } from "../resources/types";
import { getCell } from "./game";
import { isValidCell } from "./moves";

export const detectReserveSelection = (p: Point, context: ApplicationContextType) => {
    let reserveColor = interpolateReserveIndex(translatedPoint(p, context));
    let interpolated: ReserveSelect | undefined = undefined;

    if (reserveColor != -1 && !context.mouseIsDragging) {
        return interpolateReservePieceHovered(p, context, reserveColor)!
    }
    return interpolated;
}

export const detectDraggedFrom = (p: Point, context: ApplicationContextType) => {
    let reserveColor = interpolateReserveIndex(p);
    if (context.mouseIsDragging) {
        const cell = getCell(p, context)
        if (reserveColor != -1 && context.draggedFrom != reserveColor) {
            context.setDraggedFrom(reserveColor);
        } else if (context.draggedFrom != BOARD_GRAB_FROM && (cell != null && isValidCell(cell))) {
            context.setDraggedFrom(BOARD_GRAB_FROM);
        } else if (context.draggedFrom != OUT_GRAB_FROM) {
            context.setDraggedFrom(OUT_GRAB_FROM)
        }
    } else if (reserveColor === 2 && !context.mouseIsDown){
        context.setPieceOfReserve(undefined)
    }
}

export const getSelectReserve = (p1: Point, element: GamePiece): ReserveSelect => {

    const p2: Point = {
        x: p1.x + RESERVE_W,
        y: p1.y + RESERVE_H
    }
    return {
        p1, p2, element
    }
}

function detectColor(p: Point, pGrid: {
    x: any;
    y: any;
}, color: number): number {
    const p1 = getCoordsOfReserve(pGrid, color);
    const p2 = {
        x: p1.x + CELL_W * 3,
        y: p1.y + CELL_H * 3
    }

    if (inBox({ p1, p2 }, { x: p.x, y: p.y })) {
        return color;
    }
    return NOT_FOUND_INDEX;
}

function interpolateReserveIndex(p: Point) {

    const pGrid = gridCorner();
    for (let color = 0; color < 2; ++color) {
        const result = detectColor(p, pGrid, color);
        if (result != NOT_FOUND_INDEX) {
            return result;
        }
    }
    return NOT_FOUND_INDEX;
}

const interpolateReservePieceHovered = (
    p: Point,
    context: ApplicationContextType,
    reserveColor: number
  ): ReserveSelect | undefined => {
    const selectedReserve = context.reservePiecesCoords[reserveColor];
  
    for (const detected of selectedReserve) {
      const { p1, p2 } = detected;
      const box = { p1, p2 };
      const point = translatedPoint(p, context);
      const detectedInBox = getDetectedPiece(point, box, detected, context);
      
      if (detectedInBox) {
        return detectedInBox;
      }
    }
  
    context.setPieceOfReserve(undefined);
  };
  
  const getDetectedPiece = (
    point: Point,
    box: BoundingBox,
    detected: ReserveSelect,
    context: ApplicationContextType
  ): ReserveSelect | undefined => {
    if (inBox(box, point)) {
      context.setPieceOfReserve(detected);
      context.setSelectedGamePiece(undefined);
      return detected;
    }
  };

