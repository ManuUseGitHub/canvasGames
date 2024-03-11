import { Point, GamePiece, ApplicationContextType } from "../../resources/types";
import { getCell } from "../game";
import { onMouseDragging } from "./onMouseDragging";

export const onMouseHere = (p: Point, gamePieces: {
    game: GamePiece[];
}, context: ApplicationContextType) => {
    if (!context.mouseIsDown) {
        const cell = getCell(p, context);
        if (cell !== null) {
            const { i: interpoli, j: interpolj } = cell;
            const pieceFound = gamePieces.game.find(({ i, j }) => i === interpoli && j === interpolj);
            if(context.pieceOfReserve === undefined){
                context.setSelectedGamePiece(pieceFound);
            }
        }
    } else {
        onMouseDragging(p, context);
    }
}