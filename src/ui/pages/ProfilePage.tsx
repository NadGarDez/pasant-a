import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";

export const ProfilePage = (): JSX.Element => {
	return (
		<Container>
			<Header />
			<Box>
				<Typography>Profile Page</Typography>
			</Box>
		</Container>
	);
};
