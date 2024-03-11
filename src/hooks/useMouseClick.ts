import { useEffect } from "react";
import { handler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";

export const useMouseClick = (context:ApplicationContextType,windowRef: any) => {
    useEffect(() => handler("click", windowRef, (event: any) => {
        if (event != null) {
            const p = {
                x: event.clientX,
                y: event.clientY
            }
            context.setPosition(p);
            context.setFrames(0)
        }
    }, null), []);
}