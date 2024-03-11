import { useEffect } from "react";
import { ApplicationContextType } from "../resources/types";
import { handler } from "./handleEffect";
import { onMouseUp } from "../business/interrractions/onMouseUp";
import { getInterpolatedScaledPoint } from "../resources/mathsHelper";

export const useMouseUp = (context: ApplicationContextType, windowRef: any) => {
    useEffect(() => handler("mouseup", windowRef, (event: any) => {
        if (event != null) {
            onMouseUp(getInterpolatedScaledPoint({
                x: event.clientX,
                y: event.clientY
            }, context), context)
        }
    }, null), [context.mouseIsDown]);
}