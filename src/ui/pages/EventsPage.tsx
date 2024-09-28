import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { InternalSessionWrapper } from "../components/InternalSessionWrapper";
export const EventsPage = (): JSX.Element => {
	const session = useSelector(internalSessionSelector);

	console.log(session, "super");

	return (
		<Box flex={1}>
			<InternalSessionWrapper>
				<Typography>Events Page</Typography>
			</InternalSessionWrapper>
		</Box>
	);
};
