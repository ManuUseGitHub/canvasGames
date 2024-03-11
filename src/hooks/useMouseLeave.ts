import { leave } from "../redux/pointer/slice/pointerSlice";
import { useEventHandler } from "./handleEffect";

export const useMouseLeave = (context:any,canvasRef:any,dispatch:any) => {
    
    useEventHandler("mouseleave", canvasRef, (event: any) => {
        if (event != null) {
            dispatch(leave())
        }
    });
}