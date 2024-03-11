import { Point } from "../resources/types";

export const drawTextWithLineFeeds = (ctx: any, coords: Point, text: string) => {

    const { x, y } = coords;
    var lineheight = 25;
    var lines = text.split('\n');
    ctx.fillStyle = "#333333"
    ctx.font = "25px arial";
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + (i * lineheight));
    }
}