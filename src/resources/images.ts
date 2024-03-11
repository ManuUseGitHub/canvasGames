import pawn from "../resources/images/p.png";
import selectPawn from "../resources/images/_p.png";
import bishop from "../resources/images/b.png";
import rook from "../resources/images/r.png";
import selectBishopRookSilverGold from "../resources/images/_brsg.png";
import gold from "../resources/images/g.png";
import silver from "../resources/images/s.png";
import lance from "../resources/images/l.png";
import knight from "../resources/images/n.png";
import selectLanceKnight from "../resources/images/_ln.png";
import king from "../resources/images/k.png";
import selectKing from "../resources/images/_k.png";
import blackKing from "../resources/images/KK.png";
import shogi from "../resources/images/shogi.png";

export const imageOf = (image: string) => {
    const img = new Image();
    img.src = image;
    return img;
}
export const images: { [key: string]: HTMLImageElement } = {
    "shogi": imageOf(shogi),
    "p": imageOf(pawn),
    "_p": imageOf(selectPawn),
    "b": imageOf(bishop),
    "r": imageOf(rook),
    "_br": imageOf(selectBishopRookSilverGold),
    "l": imageOf(lance),
    "n": imageOf(knight),
    "_lnsg": imageOf(selectLanceKnight),
    "s": imageOf(silver),
    "g": imageOf(gold),
    "k": imageOf(king),
    "KK": imageOf(blackKing),
    "_k": imageOf(selectKing)
}

export const getSelectionImage = (symbol: string) => {
    return images[Object
        .keys(images)
        .find(key => RegExp(`_.*${symbol.charAt(0).toLowerCase()}`, 'i').test(key))!
    ];
}