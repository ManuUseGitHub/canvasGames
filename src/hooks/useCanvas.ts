import { useContext, useEffect, useRef } from "react";
import { ApplicationContextType, DrawCallBack } from "../resources/types";
import { useBindEventListeners } from "./useBindEventListeners";
import { ApplicationContext } from "../App";

const SECOND_DIVISOR = 0.0524;
const hookedDraw = (ctx: any, canvas: any, draw: () => void, options?: { predraw?: DrawCallBack, postdraw?: DrawCallBack }) => {
    if (options?.predraw)
        options.predraw(ctx, canvas);

    draw();

    if (options?.postdraw)
        options.postdraw(ctx, canvas);
}

let sleepSetTimeout_ctrl: any;

const sleep = (ms: number) => {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
};

export const useCanvas = (draw: DrawCallBack, options?: { predraw?: DrawCallBack, postdraw?: DrawCallBack }) => {
    const canvasRef = useRef(null);

    const { frameCount, setFrameCount } = useContext(ApplicationContext) as ApplicationContextType;
    
      useBindEventListeners(canvasRef);
      
    
    useEffect(() => {
        const canvas: any = canvasRef.current
        const ctx = canvas.getContext('2d');

        let framesAnimationId: number;
        (async () => {
            sleep(17).then(() => {
                hookedDraw(ctx, canvas, () => {
                    const render = () => {
                        setFrameCount(frameCount + 1 * SECOND_DIVISOR);
                        draw(ctx, frameCount)
                        framesAnimationId = window.requestAnimationFrame(render)
                    }
                    render();
                }, options)
            });
        })()

        return () => {
            window.cancelAnimationFrame(framesAnimationId)
        }
    }, [draw])

    return canvasRef
}