import { ZOOM_STEP } from "../../../resources/constantes"

export const zoomOutHandled = (state: any) => {
    state.value -= ZOOM_STEP
}