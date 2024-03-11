import { useState } from "react";
import { DEFAULT_CELL, INITIAL_MODE, OUT_GRAB_FROM } from "../resources/constantes";
import { createGame } from "../resources/gameCreator";
import { GamePiece, HighLightCode, ReserveSelect } from "../resources/types";

export const getPoint = () => ({ "x": 0, "y": 0 });
export const useHooks = () => {
    const [mouseInWindow, setMouseInWindow] = useState(false);
    const [frameCount, setFrameCount] = useState(0);
    const [debug, setDebug] = useState<{ [x: string]: (string | HighLightCode)[] }>({});
    const [cell, setCell] = useState(DEFAULT_CELL);
    const [scale, setScale] = useState(1);
    const [frames, setFrames] = useState(0);
    const [gameState, setGameState] = useState("0");
    const [reservePiecesCoords, setReservePiecesCoords] = useState<{ [x: string]: ReserveSelect[] }>({})
    const [pointClick, setPointClick] = useState(getPoint());
    const [selectedGamePiece, setSelectedGamePiece] = useState({} as GamePiece | undefined)
    const [pieceOfReserve, setPieceOfReserve] = useState<ReserveSelect | undefined>(undefined);

    const [animating, setAnimating] = useState(false);
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const [mouseIsMoving, setMouseIsMoving] = useState(false);
    const [mouseIsDragging, setMouseIsDragging] = useState(false);
    const [mode,setMode] = useState<number>(INITIAL_MODE)

    const [coords, setCoords] = useState(getPoint());
    const [translation, setTranslation] = useState(getPoint());
    const [gamePieces, setGamePieces] = useState({ game: createGame(mode) })

    const [draggedFrom, setDraggedFrom] = useState(OUT_GRAB_FROM);

    const [timer,setTimer] = useState<any>()
    const [badDropMoves,setBadDropMoves] = useState<number[][]>([]);

    return {
        frameCount, setFrameCount,
        badDropMoves,setBadDropMoves,
        pointClick, setPointClick,
        gamePieces, setGamePieces,
        debug, setDebug,
        cell, setCell,
        coords, setCoords,
        translation, setTranslation,
        mouseInWindow, setMouseInWindow,
        animating, setAnimating,
        frames, setFrames,
        selectedGamePiece, setSelectedGamePiece,
        scale, setScale,
        reservePiecesCoords, setReservePiecesCoords,
        pieceOfReserve, setPieceOfReserve,
        mode,setMode,
        mouseIsDown, setMouseIsDown,
        mouseIsMoving, setMouseIsMoving,
        mouseIsDragging, setMouseIsDragging,
        gameState, setGameState,
        draggedFrom, setDraggedFrom,
        timer,setTimer
    }
}