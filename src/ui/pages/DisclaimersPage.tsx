import { Box, Typography } from "@mui/material";
import React from "react";
import { InternalSessionWrapper } from "../components/InternalSessionWrapper";

export const DisclaimersPage = (): JSX.Element => {
	return (
		<Box flex={1}>
			<InternalSessionWrapper>
				<Typography>Disclaimers Page</Typography>
			</InternalSessionWrapper>
		</Box>
	);
};
