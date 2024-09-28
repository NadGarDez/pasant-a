import { Box, Typography } from "@mui/material";
import React from "react";
import { InternalSessionWrapper } from "../components/InternalSessionWrapper";

export const EventPage = (): JSX.Element => {
	return (
		<Box>
			<InternalSessionWrapper>
				<Typography>Event Page</Typography>
			</InternalSessionWrapper>
		</Box>
	);
};
