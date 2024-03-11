import "./style.scss";
import { Highlight, PrismTheme, themes } from "prism-react-renderer";
import { useClassPrefix } from "mazeof-react/dist/hooks/UseClassPrefix";
import { HighLightCode } from "../../../resources/types";

export const Highlighted = (props: { code: HighLightCode }) => {
	const pre = useClassPrefix("highlighted");
	const { code } = props;

	return (
		<div className={pre(`feat feat-light`)}>
			<Highlight
				theme={themes.shadesOfPurple}
				code={code.codeBlock}
				language={code.language}
			>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre style={style}>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line })}>
								<span>{i + 1}</span>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
	);
};