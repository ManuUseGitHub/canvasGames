import { useContext, useEffect, useRef } from "react";
import { ApplicationContext } from "../../App";
import { useMouseDown } from "../../hooks/useMouseDown";
import { useMouseHover } from "../../hooks/useMouseHover";
import { useMouseUp } from "../../hooks/useMouseUp";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ApplicationContextType } from "../../resources/types";
import "./style.scss";
import { useClassPrefix } from "mazeof-react/dist/hooks";
import { useKeyPress } from "../../hooks/useKeyPress";
import { detectDraggedFrom } from "../../business/detection";

export const Design = (props: any) => {
	const context = useContext(ApplicationContext) as ApplicationContextType;
	const { prefix, canvasRef, definePosition, ...rest } = props;
	const pre = useClassPrefix(prefix);
	const design = useRef(null)

	useWindowSize(context);
	useMouseUp(context, { current: window });
	useMouseHover(context, { current: window });
	useMouseDown(context, { current: window });
	useKeyPress(context, { current: window })

	return (
		<div ref={design}>
			<canvas className={pre(`feat feat-light`)} ref={canvasRef} {...rest} />
		</div>
	);
};