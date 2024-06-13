/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from "react";
import MaterialAppBar from "@mui/material/AppBar";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useOktaAuth } from "@okta/okta-react";
import { getLoginInternalRequestFromAuthState } from "../../utils/apiRequest";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { startAuthSagas } from "../../redux/slicers/internalSessionSlice";

export const Header = (): JSX.Element => {
	const { authState, oktaAuth } = useOktaAuth();

	const dispatch = useAppDispatch();

	const handleDrawerToggle = (): void => {};

	const login = async (): Promise<void> => {
		await oktaAuth.signInWithRedirect();
	};

	const logout = async (): Promise<void> => {
		await oktaAuth.closeSession();
	};

	const LoginLogoutButton = (): JSX.Element => {
		return authState?.isAuthenticated === true ? (
			<Button onClick={logout} color="inherit">
				logout
			</Button>
		) : (
			<Button onClick={login} color="inherit">
				login
			</Button>
		);
	};

	const getDataLogin = async (): Promise<void> => {
		const data = await getLoginInternalRequestFromAuthState(oktaAuth);
		dispatch(startAuthSagas(data));
	};

	useEffect(() => {
		if (authState !== undefined && authState !== null) {
			void getDataLogin();
		}
	}, []);

	return (
		<>
			<MaterialAppBar
				position="fixed"
				// className={
				// //   isLogged && showSidebar ? [classes.appBar, classes.withSidebar] : classes.appBar
				// }
				color="secondary"
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerToggle}
						// className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						CRD
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<LoginLogoutButton />
				</Toolbar>
			</MaterialAppBar>
			<Toolbar />
		</>
	);
};
