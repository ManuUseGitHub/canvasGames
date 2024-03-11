import { useEffect } from "react";
import { ApplicationContextType, Point } from "../resources/types";
import { handler } from "./handleEffect";
import { MINUS_KEY, PLUS_KEY } from "../resources/constantes";
import { rescaledPoint, translatedPoint } from "../resources/mathsHelper";

export const useKeyPress = (context:ApplicationContextType,windowRef: any) => {
    useEffect(() => handler("keydown", windowRef, (event: any) => {
        if (event != null) {
            switch (event.keyCode) {
                case PLUS_KEY : 
                    context.setScale(context.scale+0.1);
                    reposition(context);
                    break;
                case MINUS_KEY : 
                    context.setScale(context.scale-0.1);
                    reposition(context);
                    break;
            }
            context.setFrames(0)
        }
    }, null), [context.scale]);
}

const reposition = (context:ApplicationContextType) => {
    context.setPosition(rescaledPoint(context.translation,context));
}