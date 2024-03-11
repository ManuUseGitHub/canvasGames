import { useEffect } from "react";
import { handler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";

export const useMouseInWindow = (context:ApplicationContextType) => {
    const windowRef = Object.assign({ current: document });
    useEffect(() => handler("mouseleave", windowRef, (event: any) => {
        if (event != null) {
            context.setMouseInWindow(false);
        }
    }, null), []);
    useEffect(() => handler("mouseenter", windowRef, (event: any) => {
        if (event != null) {
            context.setMouseInWindow(true);
            context.setFrames(0)
        }
    }, null), []);
}