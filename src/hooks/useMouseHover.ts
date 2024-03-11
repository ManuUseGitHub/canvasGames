import { useEventHandler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";
import { getInterpolatedScaledPoint } from "../resources/mathsHelper";
import { onMouseHere } from "../business/interrractions/onMouseHere";
import { SIXTYFPS_THROTTLING_DURATION } from "../resources/constantes";
import { useAppSelector } from "../redux/hooks";
import { move, relocate, stop } from "../redux/pointer/slice/pointerSlice";

let timeout: any = undefined;

export const throttle = (callback: () => void) => {
    if (timeout === undefined) {
        callback();
        timeout = setTimeout(() => {
            // allow another call to be throttled
            timeout = undefined;
        }, SIXTYFPS_THROTTLING_DURATION);
    }
}

let timeoutMouve: any = undefined;
let whenMouseMoves = (dispatch: any) => {
    clearTimeout(timeoutMouve);
    timeoutMouve = setTimeout(() => {
        dispatch(stop());
    }, 100);
}

export const useMouseHover = (context: ApplicationContextType, windowRef: any, dispatch:any) => {
    const { isMoving } = useAppSelector(state => state.point)

    useEventHandler("mousemove", windowRef, (event: any) => {
        const scale = context.scale;
        
        if (event != null && scale) {
            
            throttle(() => {
                const p = getInterpolatedScaledPoint({ x: event.clientX, y: event.clientY }, context);
                dispatch(relocate(p));
                
    
                context.setCoords(p);
                context.setMouseIsMoving(true);
                context.setMouseIsDragging(context.mouseIsDown);
    
                onMouseHere(p, context.gamePieces, context)
                
                if(!isMoving)
                    dispatch(move());
                
                whenMouseMoves(dispatch)
            })
        }
    });
}