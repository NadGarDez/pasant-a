import { Box, Typography } from "@mui/material";
import React from "react";
import { InternalSessionWrapper } from "../components/InternalSessionWrapper";

export const VersionsPage = (): JSX.Element => {
	return (
		<Box flex={1}>
			<InternalSessionWrapper>
				<Typography>Versions Page</Typography>
			</InternalSessionWrapper>
		</Box>
	);
};
