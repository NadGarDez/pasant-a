import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";

export const GroupsPage = (): JSX.Element => {
	return (
		<Container>
			<Header />
			<Box>
				<Typography>Groups Page</Typography>
			</Box>
		</Container>
	);
};
