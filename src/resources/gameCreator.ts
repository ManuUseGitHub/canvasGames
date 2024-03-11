import { GamePiece, PieceMove } from "./types";
import data from "../resources/piecesmoves.json"
import { captureFoe } from "../business/game";
import { updatedCoords } from "../business/coordinates";
import { MODES, NOT_FOUND_INDEX } from "./constantes";

export const createGame = (mode:number) => {
    const gamePieces: GamePiece[] = [];
    const n = createPawns(gamePieces);
    const n1 = createLances(gamePieces, n);
    const n2 = createKnights(gamePieces, n1);
    const n3 = createBishops(gamePieces, n2);
    const n4 = createRooks(gamePieces, n3);
    const n5 = createSilvers(gamePieces, n4);
    const n6 = createGolds(gamePieces, n5);
    createKings(gamePieces, n6);

    if(mode == MODES.FREE_MODE){
        gamePieces.filter(g => !/^k/i.test(g.symbol) ).forEach( g => {
            g.i = NOT_FOUND_INDEX;
            g.j = NOT_FOUND_INDEX;
        })
    }

    return gamePieces;
}

const createPawns = (gamePieces: GamePiece[], n: number = 0) => {
    const { move, promotion } = data.moves.find((x: PieceMove) => x.symbol === "p") as PieceMove;
    for (let i = 1; i >= 0; --i) {
        for (let j = 0; j < 9; ++j) {
            gamePieces.push({
                id: ++n,
                symbol: "p",
                color: i,
                i: [2, 6][i],
                j,
                move,
                promotion
            })
        }
    }
    return n;
}

const createRooksAndBishops = (gamePieces: GamePiece[], symbol: string, iCoords: number[], jCoords: number[], n: number = 0) => {
    const { move, promotion } = data.moves.find((x: PieceMove) => x.symbol === symbol) as PieceMove;
    for (let i = 1; i >= 0; --i) {
        gamePieces.push({
            id: ++n,
            symbol,
            color: i,
            i: iCoords[i],
            j: jCoords[i], move, promotion
        })
    }
    return n;
}

export const createFourCornerPieces = (gamePieces: GamePiece[], symbol: string, jCoords: number[], n: number = 0) => {
    const { move, promotion } = data.moves.find((x: PieceMove) => x.symbol === symbol) as PieceMove;
    for (let i = 1; i >= 0; --i) {
        for (let j = 0; j < 2; ++j) {
            gamePieces.push({
                symbol,
                id: ++n,
                color: i,
                i: [0, 8][i],
                j: jCoords[j],
                move, promotion
            })
        }
    }
    return n;
}

const createRooks = (gamePieces: GamePiece[], n: number = 0) => {
    return createRooksAndBishops(gamePieces, "r", [1, 7], [1, 7], n);
}

const createBishops = (gamePieces: GamePiece[], n: number = 0) => {
    return createRooksAndBishops(gamePieces, "b", [1, 7], [7, 1], n);
}

const createLances = (gamePieces: GamePiece[], n: number = 0) => {
    return createFourCornerPieces(gamePieces, "l", [0, 8], n);
}

const createKnights = (gamePieces: GamePiece[], n: number = 0) => {
    return createFourCornerPieces(gamePieces, "n", [1, 7], n);
}

const createSilvers = (gamePieces: GamePiece[], n: number = 0) => {
    return createFourCornerPieces(gamePieces, "s", [2, 6], n);
}

const createGolds = (gamePieces: GamePiece[], n: number = 0) => {
    return createFourCornerPieces(gamePieces, "g", [3, 5], n);
}

const createKings = (gamePieces: GamePiece[], n: number = 0) => {

    for (let i = 1; i >= 0; --i) {
        const symbol = ["k", "KK"][i];
        const { move, promotion } = data.moves.find((x: PieceMove) => x.symbol === symbol.charAt(0)) as PieceMove;
        gamePieces.push({
            id: ++n,
            symbol,
            color: i,
            i: [0, 8][i],
            j: [4, 4][i],
            move, promotion
        })
    }
    return n;
}

export const initializeState = (gamePieces: {
    game: any[];
}) => {
    const newConfiguration = { game: [...gamePieces.game] };
    captureFoe({ i: 2, j: 1 }, newConfiguration);
    captureFoe({ i: 2, j: 6 }, newConfiguration);
    captureFoe({ i: 2, j: 8 }, newConfiguration);
    captureFoe({ i: 0, j: 5 }, newConfiguration);
    captureFoe({ i: 0, j: 6 }, newConfiguration);
    captureFoe({ i: 0, j: 1 }, newConfiguration);
    captureFoe({ i: 1, j: 1 }, newConfiguration);
    captureFoe({ i: 1, j: 7 }, newConfiguration);
    captureFoe({ i: 0, j: 0 }, newConfiguration);

    captureFoe({ i: 6, j: 0 }, newConfiguration);
    captureFoe({ i: 6, j: 1 }, newConfiguration);
    captureFoe({ i: 6, j: 2 }, newConfiguration);
    captureFoe({ i: 6, j: 3 }, newConfiguration);
    //putPieceInReserve({ i: 8, j: 5 }, newConfiguration);
    captureFoe({ i: 8, j: 8 }, newConfiguration);
    captureFoe({ i: 6, j: 0 }, newConfiguration);
    //context.setDebug(JSON.stringify(context.newConfiguration, null, 2))

    captureFoe({ i: 8, j: 3 }, newConfiguration);
    captureFoe({ i: 8, j: 2 }, newConfiguration);
    captureFoe({ i: 8, j: 1 }, newConfiguration);

    return updatedCoords(newConfiguration.game);
}