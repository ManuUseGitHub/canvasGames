import { CELL_W, CELL_H } from "../resources/constantes";
import { Point, CellAddress } from "../resources/types";

export const pieceCoords = (p: Point, cell: CellAddress, pieceImage: HTMLImageElement) => {
    return {
        x2: (p.x + (CELL_W * cell.j) + (CELL_W - pieceImage.naturalWidth) / 2),
        y2: (p.y + (CELL_H * cell.i) + (CELL_H - pieceImage.naturalHeight) / 2)
    };
}