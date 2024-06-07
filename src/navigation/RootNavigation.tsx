// import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
import React from "react";
import { Route, useHistory } from "react-router-dom";
import { EventsPage } from "../ui/pages/EventsPage";
import { DisclaimersPage } from "../ui/pages/DisclaimersPage";
import { GroupsPage } from "../ui/pages/GroupsPage";
import { VersionsPage } from "../ui/pages/VersionsPage";
import { ProfilePage } from "../ui/pages/ProfilePage";
import { ConfigPage } from "../ui/pages/ConfigPage";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { API_CONSTANTS } from "../constants/apiConstants";
import { IndexPage } from "../ui/pages/IndexPage";

export const RootNavigation = (props: any): JSX.Element => {
	const history = useHistory();
	const restoreOriginalUri = async (
		_oktaAuth: OktaAuth,
		originalUri: string | undefined,
	): Promise<void> => {
		const url = originalUri ?? "/events";
		history.replace(toRelativeUrl(url, window.location.origin));
	};
	const oktaAuth = new OktaAuth({
		issuer: API_CONSTANTS.OKTA_APPLICAITON_URL + "/oauth2/default",
		clientId: API_CONSTANTS.OKTA_APPLICATION_CLIENT_ID,
		redirectUri: "http://localhost:8080",
	});

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
			<SecureRoute path="/events" component={EventsPage} />
			<SecureRoute path="/config" component={ConfigPage} />
			<SecureRoute path="/events/:id/configuration" component={EventsPage} />
			<SecureRoute path="/events/:id/topics" component={EventsPage} />
			<SecureRoute path="/events/:id/fundamentals" component={IndexPage} />
			<SecureRoute path="/events/:id/maps" component={EventsPage} />
			<SecureRoute path="/events/:id/adverticements" component={EventsPage} />
			<SecureRoute path="/events/:id/polls" component={EventsPage} />
			<SecureRoute path="/events/:id/livestreams" component={EventsPage} />
			<SecureRoute path="/disclaimers" component={DisclaimersPage} />
			<SecureRoute path="/groups" component={GroupsPage} />
			<SecureRoute path="/versions" component={VersionsPage} />
			<SecureRoute path="/profile" component={ProfilePage} />
			<Route path="/" component={LoginCallback} />
		</Security>
	);
};
