import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { sideBarSelector } from "../../redux/slicers/appSlicer";

export const EventPage = (): JSX.Element => {
	const isSideBarVisible = useAppSelector(sideBarSelector);

	return (
		<Box ml={isSideBarVisible ? 12 : 0} p={4}>
			<Typography>Event Page</Typography>
		</Box>
	);
};
