import { useEventHandler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";

export const useMouseInWindow = (context:ApplicationContextType) => {
    const windowRef = Object.assign({ current: document });
    useEventHandler("mouseleave", windowRef, (event: any) => {
        if (event != null) {
            context.setMouseInWindow(false);
        }
    });
    useEventHandler("mouseenter", windowRef, (event: any) => {
        if (event != null) {
            context.setMouseInWindow(true);
            context.setFrames(0)
        }
    });
}