import { zoomIn, zoomOut } from "../redux/zoom/slice/zoomSlice";
import { MINUS_KEY, PLUS_KEY } from "../resources/constantes";
import { rescaledPoint } from "../resources/mathsHelper";
import { ApplicationContextType } from "../resources/types";
import { useEventHandler } from "./handleEffect";

export const useKeyPress = (context: ApplicationContextType, canvasRef: any, dispatch: any) => {
    useEventHandler("keydown", canvasRef, (event: any) => {
        if (event != null) {
            reposition(dispatch, event.keyCode, context);
            // TODO: frame up

            context.setFrames(0)
        }
    }, [context.scale]);
}

const reposition = (dispatch: any, keyCode: number, context: ApplicationContextType) => {
    switch (keyCode) {
        case PLUS_KEY:
            context.setScale(context.scale + 0.1);
            dispatch(zoomIn()); break;
        case MINUS_KEY:
            context.setScale(context.scale - 0.1);
            dispatch(zoomOut()); break;
    }
    context.setPosition(rescaledPoint(context.translation, context));
}