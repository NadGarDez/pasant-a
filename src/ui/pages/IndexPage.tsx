import { Box, Typography } from "@mui/material";
import React from "react";
import { InternalSessionWrapper } from "../components/InternalSessionWrapper";

export const IndexPage = (): JSX.Element => {
	return (
		<Box flex={1}>
			<InternalSessionWrapper>
				<Typography>Index Page</Typography>
			</InternalSessionWrapper>
		</Box>
	);
};
