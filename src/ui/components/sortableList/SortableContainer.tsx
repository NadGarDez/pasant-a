import React from "react";
import { SortableContainer as sc } from "react-sortable-hoc";

interface props {
	children: JSX.Element;
}

export const SortableContainer = sc<props>(
	({ children }: props): JSX.Element => (
		<ul
			style={{
				margin: 0,
				padding: 0,
				listStyleType: "none",
			}}
		>
			{children}
		</ul>
	),
);
