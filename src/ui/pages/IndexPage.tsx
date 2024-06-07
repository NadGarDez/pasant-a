import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";

export const IndexPage = (): JSX.Element => {
	return (
		<Container>
			<Header />
			<Box>
				<Typography>Index Page</Typography>
			</Box>
		</Container>
	);
};
