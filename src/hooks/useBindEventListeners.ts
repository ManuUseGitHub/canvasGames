import { useContext, useRef } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useKeyPress } from "./useKeyPress";
import { useMouseDown } from "./useMouseDown";
import { useWindowSize } from "./useWindowSize";
import { useMouseHover } from "./useMouseHover";
import { ApplicationContext } from "../App";
import { ApplicationContextType } from "../resources/types";
import { useMouseUp } from "./useMouseUp";
import { useMouseEnter } from "./useMouseEntered";
import { useMouseLeave } from "./useMouseLeave";

export const useBindEventListeners = (canvasRef: React.MutableRefObject<null>) => {
    const context = useContext(ApplicationContext) as ApplicationContextType;
    const windowRef = useRef(window);
    const dispatch = useAppDispatch();

    useMouseHover(context, canvasRef, dispatch);
    useMouseDown(context, windowRef, dispatch);
    useMouseUp(context, windowRef, dispatch);
    useKeyPress(context, windowRef, dispatch);
    useWindowSize(canvasRef,context,dispatch);
    useMouseEnter(context,canvasRef, dispatch);
    useMouseLeave(context,canvasRef, dispatch);
}