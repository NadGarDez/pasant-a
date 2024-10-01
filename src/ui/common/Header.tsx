/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import MaterialAppBar from "@mui/material/AppBar";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useOktaAuth } from "@okta/okta-react";
// import { getLoginInternalRequestFromAuthState } from "../../utils/apiRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { startAuthSagas } from "../../redux/slicers/internalSessionSlice";
import { toogleSideBar } from "../../redux/slicers/appSlicer";
import { CRDNavBarMenu } from "../components/CRDNavBarMenu";
import { LanguageMenu } from "../components/LanguageMenu";
import { NavBarAutocomplete } from "../components/NavBarAutocomplete";
import { baseEventSelector } from "../../redux/slicers/currentEventSlice";

export const Header = (): JSX.Element => {
	const { authState, oktaAuth } = useOktaAuth();
	const currentEvent = useAppSelector(baseEventSelector);
	console.log(currentEvent, "super");

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

	// const getDataLogin = async (): Promise<void> => {
	// 	const data = await getLoginInternalRequestFromAuthState(oktaAuth);
	// 	dispatch(startAuthSagas(data));
	// };

	return (
		<>
			<MaterialAppBar position="fixed" color="secondary">
				<Toolbar>
					{
						// here validate if exist a current event
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
					{currentEvent !== null ? <NavBarAutocomplete /> : null}
					<CRDNavBarMenu />
					<LoginLogoutButton />
				</Toolbar>
			</MaterialAppBar>
			<Toolbar />
		</>
	);
};
