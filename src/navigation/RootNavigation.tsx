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
import { Layout } from "../ui/sections/Layout";
import { EventPage } from "../ui/pages/EventPage";
import { EventConfigurationPage } from "../ui/pages/EventConfigurationPage";
import { Maps } from "../ui/pages/Maps";
import { SectionsPage } from "../ui/pages/SectionsPage";
import { BannersPage } from "../ui/pages/BannersPage";
import { LivestreamsPage } from "../ui/pages/LivestreamsPage";
import { FundamentalPage } from "../ui/pages/FundamentalsPage";
import { SnackbarProvider } from "notistack";

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
		<SnackbarProvider maxSnack={3}>
			<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
				<Layout>
					<>
						<Route exact path="/">
							<Redirect to="/events" />
						</Route>
						<SecureRoute path="/events" component={EventsPage} />
						<SecureRoute path="/configs" component={ConfigPage} />
						<SecureRoute path="/event/:id/overview" component={EventPage} />
						<SecureRoute
							path="/event/:id/configuration"
							component={EventConfigurationPage}
						/>
						<SecureRoute path="/event/:id/topics" component={EventPage} />
						<SecureRoute
							path="/event/:id/fundamentals"
							component={FundamentalPage}
						/>
						<SecureRoute path="/event/:id/maps" component={Maps} />
						<SecureRoute
							path="/event/:id/advertisements"
							component={BannersPage}
						/>
						<SecureRoute path="/event/:id/polls" component={EventPage} />
						<SecureRoute
							path="/event/:id/livestreams"
							component={LivestreamsPage}
						/>
						<SecureRoute path="/event/:id/sections" component={SectionsPage} />
						<SecureRoute path="/disclaimers" component={DisclaimersPage} />
						<SecureRoute path="/groups" component={GroupsPage} />
						<SecureRoute path="/versions" component={VersionsPage} />
						<SecureRoute path="/profile" component={ProfilePage} />
						<Route path="/login/callback" component={LoginCallback} />
					</>
				</Layout>
			</Security>
		</SnackbarProvider>
	);
};
