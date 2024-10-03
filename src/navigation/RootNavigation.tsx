import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
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
import { Layout } from "../ui/sections/Layout";
import { EventPage } from "../ui/pages/EventPage";

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
		redirectUri: window.location.origin + "/login/callback",
		scopes: ["openid profile"],
	});

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
			<Layout>
				<>
					<Route exact path="/">
						<Redirect to="/events" />
					</Route>
					<SecureRoute path="/events" component={EventsPage} />
					<SecureRoute path="/configs" component={ConfigPage} />
					<SecureRoute path="/event/:id/overview" component={EventPage} />
					<SecureRoute path="/event/:id/configuration" component={EventPage} />
					<SecureRoute path="/event/:id/topics" component={EventPage} />
					<SecureRoute path="/event/:id/fundamentals" component={IndexPage} />
					<SecureRoute path="/event/:id/maps" component={EventPage} />
					<SecureRoute path="/event/:id/advertisements" component={EventPage} />
					<SecureRoute path="/event/:id/polls" component={EventPage} />
					<SecureRoute path="/event/:id/livestreams" component={EventPage} />
					<SecureRoute path="/disclaimers" component={DisclaimersPage} />
					<SecureRoute path="/groups" component={GroupsPage} />
					<SecureRoute path="/versions" component={VersionsPage} />
					<SecureRoute path="/profile" component={ProfilePage} />
					<Route path="/login/callback" component={LoginCallback} />
				</>
			</Layout>
		</Security>
	);
};
