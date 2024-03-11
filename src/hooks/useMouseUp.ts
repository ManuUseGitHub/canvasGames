import { useEffect } from "react";
import { ApplicationContextType } from "../resources/types";
import { useEventHandler } from "./handleEffect";
import { onMouseUp } from "../business/interrractions/onMouseUp";
import { getInterpolatedScaledPoint } from "../resources/mathsHelper";
import { release } from "../redux/pointer/slice/pointerSlice";

export const useMouseUp = (context: ApplicationContextType, windowRef: any, dispatch:any) => {
    useEventHandler("mouseup", windowRef, (event: any) => {
        if (event != null) {
            dispatch(release())
            onMouseUp(getInterpolatedScaledPoint({
                x: event.clientX,
                y: event.clientY
            }, context), context);
        }
    },[context.mouseIsDown]);
}