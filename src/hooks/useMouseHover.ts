import { useEffect } from "react";
import { useEventHandler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";
import { getInterpolatedScaledPoint } from "../resources/mathsHelper";
import { onMouseHere } from "../business/interrractions/onMouseHere";

export const useMouseHover = (context: ApplicationContextType, windowRef: any) => {
    useEventHandler("mousemove", windowRef, (event: any) => {
        const scale = context.scale;
        if (event != null && scale) {

            const p = getInterpolatedScaledPoint({
                x: event.clientX, y: event.clientY
            }, context);

            context.setCoords(p);
            context.setMouseIsMoving(true);
            context.setMouseIsDragging(context.mouseIsDown);

            onMouseHere(p, context.gamePieces, context)
        }
    });
}