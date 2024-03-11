import { _π } from "../resources/constantes";
import { ApplicationContextType, GamePiece, GridDrawPack } from "../resources/types";

export const createReserve = (game: GamePiece[]) => {
    const reserved: { [x: string]: GamePiece[] }[] = [{}, {}]

    const filtered: GamePiece[] = game
        .filter(p => p.i < 0)
        .sort((a, b) => (a.id - b.id));

    filtered.forEach(element => {
        const color = element.color;
        if (!reserved[color][element.symbol]) {
            reserved[color][element.symbol] = [];
        }
        reserved[color][element.symbol].push(element)
    });

    return reserved;
}


export const transform = (ctx: any, cb: () => void) => {
    ctx.save();
    cb();
    ctx.restore();
}

export const applyRotation = (gd: GridDrawPack, rotate: boolean, context: ApplicationContextType, cb: () => void) => {
    const { ctx, height, width } = gd;
    if (rotate) {
        ctx.save();
        ctx.translate(width,height);
        ctx.rotate(_π);
        cb();
        ctx.restore();
    } else {
        cb();
    }
}

export const getTranslation = () => {
    const maxH = window.innerHeight;
    const maxW = window.innerWidth;
    return ({
        x: maxW / 2,
        y: maxH / 2,
    })
}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const initializeArrayWithValues = <T>(n : number, val:T) => Array(n).fill(val);