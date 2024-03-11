import { useContext } from "react";
import { Design } from "./design";
import { draw } from "../../Drawings/drawFunc";
import { ApplicationContext } from "../../App"
import { ApplicationContextType } from "../../resources/types";
import { useMouseInWindow } from "../../hooks/useMouseInWindow";
import { useCanvas } from "../../hooks/useCanvas";
import { useAppSelector } from "../../redux/hooks";
import { postdraw, predraw } from "./Aspect/fencingDraw";

export const Canvas = (props: any) => {

	const context = useContext(ApplicationContext) as ApplicationContextType;

	const { draws } = props;
	const p = useAppSelector(state => state.point).coords;

	const options = { predraw, postdraw };
	const canvasRef = useCanvas((ctx: any, frameCount: number) => draw(ctx, frameCount, p, draws), options)

	useMouseInWindow(context);

	return <Design prefix="canvas" canvasRef={canvasRef} />;
};