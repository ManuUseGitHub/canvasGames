import { useContext, useEffect, useRef } from "react";
import useCanvas from "../../hooks/useCanvas";
import { Design } from "./design";

import { ApplicationContext } from "../../App"
import { ApplicationContextType } from "../../resources/types";
import { useMouseHover } from "../../hooks/useMouseHover";
import { useMouseClick } from "../../hooks/useMouseClick";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useMouseDown } from "../../hooks/useMouseDown";
import { useMouseUp } from "../../hooks/useMouseUp";
import { useMouseInWindow } from "../../hooks/useMouseInWindow";

export const Canvas = ({ draw }: any) => {

	const context = useContext(ApplicationContext) as ApplicationContextType;

	const { translation } = context;
	const canvasRef = useCanvas(draw, { translation });

	useMouseInWindow(context);

	//useMouseClick(context, window);

	return <Design prefix="canvas" canvasRef={canvasRef} />;
};