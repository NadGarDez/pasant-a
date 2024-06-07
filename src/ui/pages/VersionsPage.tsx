import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";

export const VersionsPage = (): JSX.Element => {
	return (
		<Container>
			<Header />
			<Box>
				<Typography>Versions Page</Typography>
			</Box>
		</Container>
	);
};
