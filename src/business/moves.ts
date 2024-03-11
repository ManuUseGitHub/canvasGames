import { CELL_H_COUNT, CELL_W_COUNT, MODES } from "../resources/constantes";
import { flipMatrixVerticaly } from "../resources/mathsHelper";
import { GamePiece, ApplicationContextType, CellAddress } from "../resources/types";
import { findPiece } from "./game";

export const getPossibleMoves = (piece: GamePiece, context: ApplicationContextType) => {
    const move = getColorAdaptedMove(piece)
    const i = getIndexOfSymboleInMatrix(move);

    const possibleMoves: CellAddress[] = []
    const baseMatrix: number[][][] = populateBaseMatrix(i)
    for (let i2 = 0; i2 < 3; ++i2) {
        for (let j2 = 0; j2 < 3; ++j2) {
            pushOneCellMoves({ i: i2, j: j2 }, baseMatrix, piece!, move, possibleMoves)
            pushmultiCellMove({ i: i2, j: j2 }, baseMatrix, piece!, move, possibleMoves, context)
        }
    }

    return possibleMoves;
}

const pushOneCellMoves = (a: CellAddress, baseMatrix: number[][][], piece: GamePiece, move: string[][], possibleMoves: CellAddress[]) => {
    const { i: i2, j: j2 } = a;
    const [i3, j3] = baseMatrix[i2][j2];
    const moveSymbole = move[i2][j2];

    if (moveSymbole === "1" && isValidCell({ i: piece!.i + i3, j: piece!.j + j3 })) {
        possibleMoves.push({ i: piece!.i + i3, j: piece!.j + j3 })
    }
}

const pushmultiCellMove = (a: CellAddress, baseMatrix: number[][][], piece: GamePiece, move: string[][], possibleMoves: CellAddress[], context: ApplicationContextType) => {
    const { i: i2, j: j2 } = a;
    const [i3, j3] = baseMatrix[i2][j2];
    const moveSymbole = move[i2][j2];

    if (moveSymbole === "%" && isValidCell({ i: piece!.i + i3, j: piece!.j + j3 })) {
        pushUntilFoundPiece({ i: i3, j: j3 }, { i: piece!.i + i3, j: piece!.j + j3 }, possibleMoves, context);
    }
}

const pushUntilFoundPiece = (address1: CellAddress, address2: CellAddress, possibleMoves: CellAddress[], context: ApplicationContextType) => {
    const { i: i3, j: j3 } = address1;
    let { i: i4, j: j4 } = address2;

    while (isValidCell({ i: i4, j: j4 })) {
        if (findPiece({ i: i4, j: j4 }, context.gamePieces) != undefined) {
            possibleMoves.push({ i: i4, j: j4 });
            break;
        } else {
            possibleMoves.push({ i: i4, j: j4 });
            i4 += i3;
            j4 += j3;
        }
    }
}

const populateBaseMatrix = (color: number): number[][][] => {
    const baseMatrix: number[][][] = []
    for (let i2 = 0; i2 < 3; ++i2) {

        baseMatrix.push([] as number[][])
        for (let j2 = 0; j2 < 3; ++j2) {
            baseMatrix[i2].push([i2 - 1 * color, j2 - 1]);
        }
    }
    return baseMatrix;
}

const getIndexOfSymboleInMatrix = (move: string[][]) =>
    move.findIndex(line => {
        const j = line.findIndex(str => /[a-z]+/i.test(str))
        return j >= 0;
    });

const getColorAdaptedMove = (piece: GamePiece) => piece.color === 0 ?
    flipMatrixVerticaly(piece.move) :
    piece.move;

export const isValidCell = (cell: CellAddress) => {
    const { i, j } = cell;
    return 0 <= i && i < CELL_H_COUNT && 0 <= j && j < CELL_W_COUNT;
}

export const isValidMove = (piece: GamePiece, cell: CellAddress, context: ApplicationContextType) => {
    const found = findPiece(cell, context.gamePieces);
    const isPossible = getPossibleMoves(piece, context)
        .find(c =>
            matchingAddresses(c, cell) &&
            isOpponentOrFree(found, piece)
        ) != undefined;

    return isPossible || isOpponentOrFree(found, piece) && hasGoodMode(context);
}

export const matchingAddresses = (a: CellAddress, b: CellAddress) =>
    a.i === b.i && a.j === b.j;

export const hasGoodMode = (context: ApplicationContextType): boolean =>
    context.mode === MODES.EXPLAIN_MODE || context.mode === MODES.FREE_MODE;

export const isOpponentOrFree = (found: GamePiece | undefined, piece: GamePiece) =>
    found === undefined || found!.color != piece.color;

