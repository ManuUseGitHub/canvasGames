import { getInterpolatedScaledPoint } from "../../resources/mathsHelper";
import { Point, ApplicationContextType, CellAddress, GamePiece } from "../../resources/types";
import { updatedCoords } from "../coordinates";
import { getCell, arePieceMatching, findPiece, captureFoe } from "../game";
import { getPossibleMoves, isValidCell, isValidMove } from "../moves";

export const onMouseUp = (p: Point, context: ApplicationContextType) => {
    context.setMouseIsDown(false);
    
    dropFromReserve(p, context);
    moveOnBoard(p, context);
}

function dropFromReserve(p: Point, context: ApplicationContextType) {
    if (context.pieceOfReserve) {
        const cell = getCell(p, context);

        if (cell !== null && isCellFree(cell, context.gamePieces)) {
            const matchesBadDropMove = context.badDropMoves.find(c => cell.i === c[0] && cell.j === c[1]) !== undefined;
            if (!matchesBadDropMove) {
                movePieceAtPosition(cell, context.pieceOfReserve.element, context);

                context.setPieceOfReserve(undefined);
                context.setBadDropMoves([]);
                focusGamePiece(cell, context)
            }
        }
    }
}
function moveOnBoard(p: Point, context: ApplicationContextType) {
    const piece = context.selectedGamePiece;
    if (piece) {
        const cell = getCell(p, context);
        if (cell !== null && isValidMove(piece, cell, context)) {
            capturePiece(cell, context)
            movePieceAtPosition(cell, piece, context);
            focusGamePiece(cell, context)
        }
    }
}

function focusGamePiece(cell: CellAddress, context: ApplicationContextType) {
    const pieceFound = context.gamePieces.game.find(({ i, j }) => i === cell.i && j === cell.j);
    context.setSelectedGamePiece(pieceFound);
    context.setMouseIsDragging(false);
}

function movePieceAtPosition(cell: CellAddress, piece: GamePiece, context: ApplicationContextType) {
    const { i: interpoli, j: interpolj } = cell

    const modifiedGame = {
        game: context.gamePieces.game.map(g => {
            if (arePieceMatching(g!, piece!)) {
                g.i = interpoli;
                g.j = interpolj;
            }
            return g;
        })
    };

    context.setGamePieces(modifiedGame);
}

const capturePiece = (cell: CellAddress, context: ApplicationContextType) => {
    const found = findPiece(cell, context.gamePieces);
    if (found && found.color !== context.selectedGamePiece?.color) {
        captureFoe(cell, context.gamePieces);
        const newConfiguration = { game: [...context.gamePieces.game] };

        context.setGamePieces(newConfiguration);
        context.setReservePiecesCoords(updatedCoords(newConfiguration.game));
    }
};

const isCellFree = (cell: { i: number; j: number; }, gamePieces: { game: GamePiece[]; }) =>
    findPiece(cell, gamePieces) === undefined


