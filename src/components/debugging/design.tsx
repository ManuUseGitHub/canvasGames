import "./style.scss";
import { useClassPrefix } from "mazeof-react/dist/hooks";

export const Design = ({ prefix,debugFormal }: any) => {
	const pre = useClassPrefix(prefix);
	 const {style,debugContent,element} = debugFormal;

	return (
		<div ref={element} className={pre(`feat feat-light`)}>
			<div id="debug-content" className={style}>
				{debugContent}
			</div>
		</div>
	);
};