import React from "react";
import { Box, Paper } from "@mui/material";

interface props {
	title?: string;
	children: JSX.Element;
}

export const Body = (props: props): JSX.Element => {
	const { children } = props;
	return (
		<Paper
			elevation={3}
			sx={{
				width: "100%",
				flex: 1,
				padding: 3,
				minHeight: 400,
			}}
		>
			<Box flex={1} mt={3}>
				{children}
			</Box>
		</Paper>
	);
};
