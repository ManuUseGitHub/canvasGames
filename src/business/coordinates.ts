import { createReserve } from "../Drawings/common";
import { gridCorner, getCoordsOfReserve, getNewPointOfReservedPieces } from "../resources/mathsHelper";
import { GamePiece, ReserveSelect } from "../resources/types";
import { getSelectReserve } from "./detection";

export const updatedCoords = (game: GamePiece[]) => {
    const reserved = createReserve(game);
    const coords: { [x: string]: ReserveSelect[] } = {};
    const pGrid = gridCorner();

    for (let color = 0; color < 2; ++color) {
        coords[color] = [];
        const reserve = reserved[color];
        const keys: string[] = Object.keys(reserve);

        for (let cpt = 0; cpt < keys.length; ++cpt) {
            const firstGamePieceOfSymbol = reserve[keys[cpt]][0];

            let p1 = getCoordsOfReserve(pGrid, color);
            const p2 = getNewPointOfReservedPieces(cpt, p1,color)
            const select: ReserveSelect = getSelectReserve(p2, firstGamePieceOfSymbol);

            coords[color].push(select);
        }
    }

    return coords;
}