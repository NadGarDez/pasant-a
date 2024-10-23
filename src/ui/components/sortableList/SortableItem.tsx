import { Typography, Box } from "@mui/material";
import React from "react";
import { SortableElement as se } from "react-sortable-hoc";

interface props {
	value: string;
}

export const SortableItem = se<props>(
	({ value }: props): JSX.Element => (
		<Box
			sx={{
				border: "1px dashed gray",
				marginBottom: ".5rem",
				backgroundColor: "white",
				cursor: "move",
				padding: 2,
			}}
		>
			<Typography>{value}</Typography>
		</Box>
	),
);
