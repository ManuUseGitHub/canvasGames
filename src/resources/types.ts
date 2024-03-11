import React, { Dispatch, SetStateAction } from "react";

export type Point = {
    x: number,
    y: number
}

export type BoundingBox = {
    p1: Point,
    p2: Point
}

export type ReserveSelect = {
    element: GamePiece
} & BoundingBox;

export type CellAddress = {
    i: number,
    j: number
}

export type LineDrawPack = {
    ctx: any,
    spacing: number,
    width: number,
    height: number,
    i: number
} & Point;

export type GridDrawPack = {
    ctx: any,
    padding: number,
    width: number,
    height: number,
    cellCountX: number,
    cellCountY: number
} & Point;

export type Piece = {
    move: string[][],
    promotion?: string
}

export type GamePiece = {
    id: number,
    symbol: string,
    color: number,
    move: string[][],
    promotion?: string
} & CellAddress

export type PiecesZone = {
    [x: string]: GamePiece[];
}

export type ReservePieceDrawPack = {
    ctx: any,
    color: number,
    cpt: number,
    key: string,
    symbol: string,
    translations: TranslateTupples,
    context: ApplicationContextType,
    pieceImage: HTMLImageElement,
    reserved: PiecesZone,
    p2: Point
}

export type PieceMove = {
    name: string,
    symbol: string,
    move: string[][],
    promotion?: string,
}

export type TranslateTupples = {
    [x: string]: number[],
};

export type HighLightCode = {
    language: "jsx" | "tsx" | "json",
    codeBlock: string
}

export type ApplicationContextType = {
    badDropMoves: number[][],
    setBadDropMoves: React.Dispatch<React.SetStateAction<number[][]>>,
    mouseInWindow: boolean,
    setMouseInWindow: React.Dispatch<React.SetStateAction<boolean>>
    position: Point,
    setPosition: React.Dispatch<React.SetStateAction<Point>>,
    coords: Point,
    setCoords: React.Dispatch<React.SetStateAction<Point>>,
    cell: CellAddress,
    setCell: React.Dispatch<React.SetStateAction<CellAddress>>
    translation: Point,
    setTranslation: Dispatch<SetStateAction<Point>>,
    debug: { [x: string]: (string | HighLightCode)[] },
    setDebug: React.Dispatch<React.SetStateAction<{
        [x: string]: (string | HighLightCode)[]
    }>>,
    setGamePieces: React.Dispatch<React.SetStateAction<{ game: GamePiece[]; }>>,
    gamePieces: { game: GamePiece[]; },
    animating: boolean,
    setAnimating: React.Dispatch<React.SetStateAction<boolean>>,
    frames: number,
    setFrames: React.Dispatch<React.SetStateAction<number>>,
    selectedGamePiece: GamePiece | undefined,
    setSelectedGamePiece: React.Dispatch<React.SetStateAction<GamePiece | undefined>>,
    pointClick: Point,
    setPointClick: React.Dispatch<React.SetStateAction<Point>>,
    scale: number,
    setScale: React.Dispatch<React.SetStateAction<number>>,
    reservePiecesCoords: { [x: string]: ReserveSelect[] },
    setReservePiecesCoords: React.Dispatch<React.SetStateAction<{ [x: string]: ReserveSelect[] }>>,
    pieceOfReserve: ReserveSelect | undefined,
    setPieceOfReserve: React.Dispatch<React.SetStateAction<ReserveSelect | undefined>>,
    mouseIsDown: boolean,
    setMouseIsDown: React.Dispatch<React.SetStateAction<boolean>>,
    mouseIsMoving: boolean,
    setMouseIsMoving: React.Dispatch<React.SetStateAction<boolean>>,
    mouseIsDragging: boolean,
    setMouseIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    gameState: string,
    setGameState: React.Dispatch<React.SetStateAction<string>>,
    draggedFrom: number,
    setDraggedFrom: React.Dispatch<React.SetStateAction<number>>,
    mode: number,
    setMode: React.Dispatch<React.SetStateAction<number>>,
    timer: any,
    setTimer: React.Dispatch<any>
}
