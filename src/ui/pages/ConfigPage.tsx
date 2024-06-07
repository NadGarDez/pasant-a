import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";

export const ConfigPage = (): JSX.Element => {
	return (
		<Container>
			<Header />
			<Box>
				<Typography>Config Page</Typography>
			</Box>
		</Container>
	);
};
