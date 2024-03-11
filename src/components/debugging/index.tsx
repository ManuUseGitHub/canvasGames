import { ReactNode } from "react";
import { ApplicationContextType, HighLightCode } from "../../resources/types";
import { Highlighted } from "./Highlighted";
import { Design } from "./design";

export const Debugging = () => {
	const displayMessages = (context: ApplicationContextType, key: string): ReactNode => (
		context.debug[key]) ? context.debug[key]
			.map(readDebug) : null

	const getTextNode = (d: string) => (<p>{(d)
		.split("\n")
		.map((s: string, i: number) => (i != 0) ?
			(<span><br />{s}</span>) :
			<span>{s}</span>)}
	</p>)

	const getHighlightedCode = (code: HighLightCode) => (code.codeBlock != undefined) ?
		(<Highlighted code={code}></Highlighted>) :
		null;

	const readDebug = (d: string | HighLightCode) => {
		const btype = typeof (d);
		if (btype === "string") {
			return getTextNode(d as string)
		} else if (btype === "object") {
			return getHighlightedCode(d as HighLightCode);
		} return "";
	}
	return <Design prefix="debugging" displayMessages={displayMessages} />;
};