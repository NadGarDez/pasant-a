/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Typography } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React from "react";

export const EventsPage = (): JSX.Element => {
	const { authState, oktaAuth } = useOktaAuth();

	const login = async (): Promise<void> => {
		await oktaAuth.signInWithRedirect();
	};

	const logout = async (): Promise<void> => {
		await oktaAuth.closeSession();
	};

	return (
		<Box>
			<Typography>Events Page</Typography>
			{authState?.isAuthenticated === true ? (
				<button onClick={logout}>logout</button>
			) : (
				<button onClick={login}>login</button>
			)}
		</Box>
	);
};
