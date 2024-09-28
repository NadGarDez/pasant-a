import { Box, Typography } from "@mui/material";
import React from "react";
import { InternalSessionWrapper } from "../components/InternalSessionWrapper";

export const GroupsPage = (): JSX.Element => {
	return (
		<Box flex={1}>
			<InternalSessionWrapper>
				<Typography>Groups Page</Typography>
			</InternalSessionWrapper>
		</Box>
	);
};
