import React from "react";
import { ApplicationContextType, CellAddress, GamePiece, Point, ReserveSelect } from "../resources/types";
import { gridCorner, interpolate, translatedPoint } from "../resources/mathsHelper";
import { isValidCell } from "./moves";

export const setFoundPieceAt = (c: CellAddress, gamePieces: {
    game: GamePiece[];
}, setSelectedPiece: React.Dispatch<React.SetStateAction<GamePiece | undefined>>) => {
    setSelectedPiece(findPiece(c, gamePieces));
}

export const findPiece = (c: CellAddress, gamePieces: {
    game: GamePiece[];
}) => {
    return gamePieces.game.find(({ i, j }) => i === c.i && j === c.j)
}

export const getCell = (coords: Point, context: ApplicationContextType) => {
    const gCoords = gridCorner()

    const { i, j } = interpolate(gCoords, translatedPoint(coords, context));

    return isValidCell({ i, j }) ? { i, j } : null;
}

export const arePieceMatching = (a: GamePiece, b: GamePiece) => (
    a.color === b.color &&
    a.id === b.id
);

export const captureFoe = (cell: CellAddress, gamePieces: { game: GamePiece[]; }) => {
    const piece = findPiece(cell, gamePieces);
    if (piece) {
        piece.color = (piece.color + 1) % 2
        piece!.i = -1;
        piece!.j = -1;
    }
};

