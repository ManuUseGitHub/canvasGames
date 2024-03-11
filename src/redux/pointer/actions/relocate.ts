import { PayloadAction } from "@reduxjs/toolkit";
import { DRAG_SENSITIVITY } from "../../../resources/constantes";
import { GostPoint, Point } from "../../../resources/types";

const isIntentionalDrag = (p1: GostPoint, p2: Point) => {
    return (
        p1.x === undefined ||
        DRAG_SENSITIVITY < Math.abs(p1.x - p2.x) ||
        DRAG_SENSITIVITY < Math.abs(p1.y! - p2.y)
    )
};

export const dragHandled = (state: any) => {
    if (state.down && isIntentionalDrag(state.coords, state.from)) {
        state.dragging = true;
        state.dragged = true;
    }
}

export const relocateHandled = (state: any, action: PayloadAction<Point>) => {
    const { x, y } = action.payload;
    if (state.coords.x !== x || state.coords.y !== y) {
        state.coords = action.payload
    }

    dragHandled(state);
}