import { ApplicationContextType, Point } from "../../resources/types"
import { onMouseHere } from "./onMouseHere"

export const onMouseDragging = (p:Point, context:ApplicationContextType) => {
    upDateTranslation(p,context);
}

function upDateTranslation(p: Point, context: ApplicationContextType) {
    if (context.mouseIsDragging && !(context.selectedGamePiece || context.pieceOfReserve?.element)) {
        const scale = context.scale;
        context.setTranslation({
            x: Math.floor((p.x - context.position.x) * scale),
            y: Math.floor((p.y - context.position.y) * scale)
        })
    }
}

