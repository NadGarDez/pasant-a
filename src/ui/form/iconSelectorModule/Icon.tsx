import React, { useMemo } from "react";
import { maps } from "./constants";

interface props {
	fontFamily: string;
	name: string;
	styles?: React.CSSProperties;
}

const getMap = (fontFamily: string): Record<string, number> => {
	return maps[fontFamily] ?? {};
};

export const Icon = (props: props): JSX.Element => {
	const { fontFamily, styles = {}, name } = props;

	const iconCode = useMemo(() => {
		const map = getMap(fontFamily);

		return map[name] ?? "?";
	}, [name, fontFamily]);

	return (
		<i
			style={{
				fontFamily,
				fontWeight: "normal",
				fontStyle: "normal",
				...styles,
			}}
		>
			{String.fromCharCode(iconCode)}
		</i>
	);
};
