import { PayloadAction } from "@reduxjs/toolkit";
import { Dimension } from "../../../resources/types";

export const redimensionHandled = (state:any, action: PayloadAction<Dimension>) => {
    const {width, height} = action.payload;
    //action.payload
    
    if(state.width !== width || state.height !== height){
        state.width = width;
        state.height = height;
    }
}