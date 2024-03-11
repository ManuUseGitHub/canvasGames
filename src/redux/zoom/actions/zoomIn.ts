import { ZOOM_STEP } from "../../../resources/constantes"

export const zoomInHandled = (state: any) => {
    state.value += ZOOM_STEP
} 