import { enter } from "../redux/pointer/slice/pointerSlice";
import { useEventHandler } from "./handleEffect";

export const useMouseEnter = (context:any,canvasRef:any,dispatch:any) => {

    useEventHandler("mouseenter", canvasRef, (event: any) => {
        if (event != null) {
            dispatch(enter())
        }
    });
}