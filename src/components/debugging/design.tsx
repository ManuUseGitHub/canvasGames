import { ReactNode, useContext, useEffect, useState } from "react";
import "./style.scss";
import { useClassPrefix } from "mazeof-react/dist/hooks";
import { ApplicationContext } from "../../App";
import { ApplicationContextType } from "../../resources/types";
import { DROP_RESTRICTION, GAME_STATE } from "../../resources/messageConstants";

export const Design = ({ prefix,displayMessages }: any) => {
	const pre = useClassPrefix(prefix);
	const context = useContext(ApplicationContext) as ApplicationContextType;

	const [debugContent, setDebugContent] = useState<ReactNode>("")

	useEffect(() => {
		setDebugContent(displayMessages(context,GAME_STATE))
	}, [JSON.stringify(context.debug)])

	return (
		<div className={pre(`feat feat-light`)}>
			<div id="debug-content">
				{debugContent}
			</div>
		</div>
	);
};