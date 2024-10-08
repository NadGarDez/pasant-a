/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import MaterialAppBar from "@mui/material/AppBar";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useOktaAuth } from "@okta/okta-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toogleSideBar } from "../../redux/slicers/appSlicer";
import { CRDNavBarMenu } from "../components/CRDNavBarMenu";
import { LanguageMenu } from "../components/LanguageMenu";
import { NavBarAutocomplete } from "../components/NavBarAutocomplete";
import { LoginLogoutButton } from "../components/LoginLogoutButton";
import { activeEventSelector } from "../../redux/slicers/eventsSlice";

export const Header = (): JSX.Element => {
	const { authState, oktaAuth } = useOktaAuth();
	const activeEvent = useAppSelector(activeEventSelector);

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

	return (
		<>
			<MaterialAppBar position="fixed" color="secondary">
				<Toolbar>
					{
						// here validate if exist a current event
						activeEvent !== null ? (
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
					{activeEvent !== null ? <NavBarAutocomplete /> : null}
					<CRDNavBarMenu />
					<LoginLogoutButton
						isAuthenticated={authState?.isAuthenticated ?? false}
						login={login}
						logout={logout}
					/>
				</Toolbar>
			</MaterialAppBar>
			<Toolbar />
		</>
	);
};
