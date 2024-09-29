import React from "react";
import { InternalSessionWrapper } from "../ui/components/InternalSessionWrapper";

export const withInternalSession = (
	Element: () => JSX.Element,
): (() => JSX.Element) => {
	// eslint-disable-next-line react/display-name
	return () => (
		<InternalSessionWrapper>
			<Element />
		</InternalSessionWrapper>
	);
};
