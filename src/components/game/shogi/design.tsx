
import { useClassPrefix } from "mazeof-react/dist/hooks";
import { pulseSeconds } from "../../../Drawings/check";
import store from "../../../redux/store";
import { Canvas } from "../../Canvas";
import "./style.scss";

export const Design = ({ prefix }: any) => {
	const pre = useClassPrefix(prefix);
	const state = store.getState();
	const {point} = state
	const draws = [];

	if(point.inCanvas){
		draws.push(pulseSeconds)
	}
	return (
		<div className={pre(`feat feat-light`)}>
			<Canvas draws={draws}></Canvas>
		</div>
	);
};