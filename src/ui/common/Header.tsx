/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from "react";
import MaterialAppBar from "@mui/material/AppBar";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useOktaAuth } from "@okta/okta-react";
import { getLoginInternalRequestFromAuthState } from "../../utils/apiRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { startAuthSagas } from "../../redux/slicers/internalSessionSlice";
import { toogleSideBar } from "../../redux/slicers/appSlicer";
import { currentEventSelector } from "../../redux/slicers/eventsSlice";
import { CRDNavBarMenu } from "../components/CRDNavBarMenu";
import { LanguageMenu } from "../components/LanguageMenu";

export const Header = (): JSX.Element => {
	const { authState, oktaAuth } = useOktaAuth();
	const currentEvent = useAppSelector(currentEventSelector);

	const dispatch = useAppDispatch();

	const handleDrawerToggle = (): void => {
		dispatch(toogleSideBar());
	};

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
					{
						// here validate if exist a current event
						// eslint-disable-next-line no-constant-condition
						currentEvent !== null ? (
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={handleDrawerToggle}
								// className={classes.menuButton}
							>
								<MenuIcon />
							</IconButton>
						) : null
					}

					<Typography variant="h6" color="inherit" noWrap>
						CRD Events
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<LanguageMenu />
					<CRDNavBarMenu />
					<LoginLogoutButton />
				</Toolbar>
			</MaterialAppBar>
			<Toolbar />
		</>
	);
};
