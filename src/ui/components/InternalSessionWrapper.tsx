import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";

interface props {
	children: JSX.Element;
}

export const InternalSessionWrapper = (props: props): JSX.Element => {
	const { children } = props;
	const { status } = useSelector(internalSessionSelector);

	if (status === "AUTHENTICATED") return <>{children}</>;

	return (
		<Box sx={{ width: "100%" }}>
			<LinearProgress color="primary" />
		</Box>
	);
};
