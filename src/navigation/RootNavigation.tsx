// import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventsPage } from "../ui/pages/EventsPage";
import { DisclaimersPage } from "../ui/pages/DisclaimersPage";
import { GroupsPage } from "../ui/pages/GroupsPage";
import { VersionsPage } from "../ui/pages/VersionsPage";
import { ProfilePage } from "../ui/pages/ProfilePage";
import { LoginPage } from "../ui/pages/Login";
import { ConfigPage } from "../ui/pages/ConfigPage";
import { LoginCallback, Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { API_CONSTANTS } from "../constants/apiConstants";
import { IndexPage } from "../ui/pages/IndexPage";

export const RootNavigation = (props: any): JSX.Element => {
	const restoreOriginalUri = async (
		_oktaAuth: OktaAuth,
		originalUri: string,
	): Promise<void> => {
		props.history.replace(
			toRelativeUrl(originalUri ?? "/", window.location.origin),
		);
	};
	console.log(window.location.origin);
	const oktaAuth = new OktaAuth({
		issuer: API_CONSTANTS.OKTA_APPLICAITON_URL + "/oauth2/default",
		clientId: API_CONSTANTS.OKTA_APPLICATION_CLIENT_ID,
		redirectUri: "http://localhost:8080",
	});

	return (
		<BrowserRouter>
			<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
				<Routes>
					<Route path="/" Component={LoginCallback} />
					<Route path="/config" Component={ConfigPage} />
					<Route path="/events" Component={EventsPage} />
					<Route path="/events/:id/configuration" Component={EventsPage} />
					<Route path="/events/:id/topics" Component={EventsPage} />
					<Route path="/events/:id/fundamentals" Component={IndexPage} />
					<Route path="/events/:id/maps" Component={EventsPage} />
					<Route path="/events/:id/adverticements" Component={EventsPage} />
					<Route path="/events/:id/polls" Component={EventsPage} />
					<Route path="/events/:id/livestreams" Component={EventsPage} />
					<Route path="/disclaimers" Component={DisclaimersPage} />
					<Route path="/groups" Component={GroupsPage} />
					<Route path="/versions" Component={VersionsPage} />
					<Route path="/profile" Component={ProfilePage} />
					<Route path="/login" Component={LoginPage} />
				</Routes>
			</Security>
		</BrowserRouter>
	);
};
