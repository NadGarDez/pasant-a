/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";

export const EventsPage = (): JSX.Element => {
	return (
		<Container>
			<Header />
			<Box>
				<Typography>Events Page</Typography>
			</Box>
		</Container>
	);
};
