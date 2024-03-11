import { ApplicationContextType, CellAddress, HighLightCode } from "./types";
import data from "../resources/pieces.json"

const pieces: { [x: string]: any } = {}
data.forEach(element => {
    pieces[element.ID] = element;
});

export const cellAddressToAlphabet = (cell: CellAddress) => {
    const { i, j } = cell;
    const letters: string[] = "ABCDEFGHI".split('');
    const numbers: string[] = "123456789".split('');
    return `${numbers[i]}${letters[j]}`
}

export const configureDebug = (ij: CellAddress, context: ApplicationContextType) => {
    const msgs: string[] = [cellAddressToAlphabet(ij)];
    const piece = context.selectedGamePiece
    if (piece && piece.id) {

        msgs.push("this is the");
        msgs.push(pieces[normalizeSymbole(piece.symbol)]["English name"]);
        msgs.push(`#${piece.id}`);
    }
    return msgs.join("\n");
}

function normalizeSymbole(symbol: string) {
    return symbol.charAt(0)
}

export const pushDebugMessage = (context: ApplicationContextType, key: string, entry: (string | HighLightCode)[]) => {
    context.setDebug(Object.assign(context.debug, { [key]: entry }));
}