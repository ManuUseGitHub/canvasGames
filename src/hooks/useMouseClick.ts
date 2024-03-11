import { useEventHandler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";

export const useMouseClick = (context:ApplicationContextType,windowRef: any) => {
    useEventHandler("click", windowRef, (event: any) => {
        if (event != null) {
            const p = {
                x: event.clientX,
                y: event.clientY
            }
            context.setPosition(p);
            context.setFrames(0)
        }
    });
}