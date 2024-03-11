import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ApplicationContextType, BoundingBox, HighLightCode, Point } from "../../resources/types";
import { Highlighted } from "./Highlighted";
import { Design } from "./design";
import { ApplicationContext } from "../../App";
import { useThrottle } from "../../hooks/mouseUtil";
import { useEventHandler } from "../../hooks/handleEffect";
import { GAME_STATE } from "../../resources/messageConstants";
import { inBox } from "../../resources/mathsHelper";
import { SIXTYFPS_THROTTLING_DURATION } from "../../resources/constantes";

export const Debugging = () => {
	const context = useContext(ApplicationContext) as ApplicationContextType;

	const [debugContent, setDebugContent] = useState<ReactNode>("");
	const [style, setStyle] = useState<string>();
	const [bounding, setBounding] = useState<BoundingBox>()

	const windowRef = useRef(window);
	const element: any = useRef(null);

	const debugFormal = { style, debugContent, element }

	const displayMessages = (context: ApplicationContextType, key: string): ReactNode => (
		context.debug[key]) ? context.debug[key]
			.map(readDebug) : null

	const getTextNode = (d: string, index: number) => (<p key={"p" + index}>{(d)
		.split("\n")
		.map((s: string, i: number) => (i != 0) ?
			(<span key={`span-${i}-${index}`}><br />{s}</span>) :
			<span key={`span-${i}-${index}`}>{s}</span>)}
	</p>)

	const getHighlightedCode = (code: HighLightCode, index: number) => (code.codeBlock !== undefined) ?
		(<Highlighted code={code} key={`span-${index}`}></Highlighted>) :
		null;

	const { throttle } = useThrottle(SIXTYFPS_THROTTLING_DURATION);

	const readDebug = (d: string | HighLightCode, index: number) => {
		const btype = typeof (d);
		return (btype === "object") ? getHighlightedCode(d as HighLightCode, index) : getTextNode(d as string, index);
	}

	useEffect(() => {
		setDebugContent(displayMessages(context, GAME_STATE))
		const debugProp = element!.current;
		setBounding({
			p1: { x: debugProp.clientLeft, y: debugProp.clientTop },
			p2: {
				x: debugProp.clientLeft + debugProp.clientWidth,
				y: debugProp.clientTop + debugProp.clientHeight
			}
		});

	}, [JSON.stringify(context.debug)]);

	useEventHandler("mousemove", windowRef, (event: any) => {
		if (event !== null) {
			throttle(() => {
				if (bounding) {
					setStyle(inBox(bounding!, { x: event.pageX, y: event.pageY }) ? "hovered" : undefined)
				}
			})
		}
	}, [bounding]);

	return <Design prefix="debugging" displayMessages={displayMessages} debugFormal={debugFormal} />;
};