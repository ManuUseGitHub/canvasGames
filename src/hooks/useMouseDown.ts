import { useEffect } from "react";
import { useEventHandler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";
import { onMouseDown } from "../business/interrractions/onMouseDown";
import { getInterpolatedScaledPoint } from "../resources/mathsHelper";

// Hook
export const useMouseDown = (context: ApplicationContextType, windowRef: any) => {
    useEventHandler("mousedown", windowRef, (event: any) => {
        if (event != null) {

            context.setMouseIsDown(true);
            const p = {
                x: Math.floor(event.clientX),
                y: Math.floor(event.clientY)
            };

            context.setPosition(getInterpolatedScaledPoint({
                x: p.x - context.translation.x,
                y: p.y - context.translation.y
            }, context))

            onMouseDown(p, context);
        }
    }, [context.mouseIsDragging]);
}