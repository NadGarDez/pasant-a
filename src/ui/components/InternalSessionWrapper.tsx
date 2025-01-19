import React from "react";
import { Alert, Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";

interface props {
	children: JSX.Element;
}

export const InternalSessionWrapper = (props: props): JSX.Element => {
	const { children } = props;
	const { status, errorMesssage } = useSelector(internalSessionSelector);

	if (status === "AUTHENTICATED") return <>{children}</>;

	if (status === "AUTHENTICATION_ERROR")
		return <Alert severity="error">{errorMesssage ?? ""}</Alert>;

	return (
		<Box sx={{ width: "100%" }}>
			<LinearProgress color="primary" />
		</Box>
	);
};
