import { Box, Typography } from "@mui/material";
import React from "react";
import { InternalSessionWrapper } from "../components/InternalSessionWrapper";

export const ProfilePage = (): JSX.Element => {
	return (
		<Box flex={1}>
			<InternalSessionWrapper>
				<Typography>Profile Page</Typography>
			</InternalSessionWrapper>
		</Box>
	);
};
