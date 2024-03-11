import { Shogi } from "../shogi";
import "./style.scss";
import { useClassPrefix } from "mazeof-react/dist/hooks";

export const Design = ({ prefix }:any) => {
	const pre = useClassPrefix(prefix);

	return (
		<div className={pre(`feat feat-light`)}>
			<Shogi></Shogi>
		</div>
	);
};