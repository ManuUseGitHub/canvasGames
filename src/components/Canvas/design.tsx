import { useContext, useEffect, useRef } from "react";
import { ApplicationContext } from "../../App";
import { ApplicationContextType } from "../../resources/types";
import "./style.scss";
import { useClassPrefix } from "mazeof-react/dist/hooks";
import { detectDraggedFrom } from "../../business/detection";

export const Design = (props: any) => {
	const { prefix, canvasRef, definePosition, ...rest } = props;
	const pre = useClassPrefix(prefix);
	const design = useRef(null)

	//useWindowSize(canvasRef,context,dispatch);
	//useMouseUp(context, { current: window });
	//useMouseHover(context, { current: window });
	//useMouseDown(context, { current: window });

	return (
		<div ref={design}>
			<canvas className={pre(`feat feat-light`)} ref={canvasRef} {...rest} />
		</div>
	);
};