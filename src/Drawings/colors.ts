import { findPiece } from "../business/game";
import { ALLY_MOVE, BLOCKED_MOVE } from "../resources/constantes";
import { ApplicationContextType, CellAddress } from "../resources/types";

export const getAllyOrFoeColor = (cell: CellAddress, context: ApplicationContextType) => {
    const piece = context.selectedGamePiece;
    const encoutered = findPiece(cell, context.gamePieces)
    return piece!.color === encoutered!.color ? ALLY_MOVE : BLOCKED_MOVE;
}

export const hexcolorToRGBCSSString = (str: string) => {
    const regex = /[0-9A-F]{2}/gmi;
    let m;
    const components: number[] = [];
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match) => {
            components.push(parseInt(match, 16))
        });

    }
    return `rgb(${components.join(',')})`
}