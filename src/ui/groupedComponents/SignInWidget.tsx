import React, { useEffect, useRef } from "react";
import type { EffectCallback } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import "../../../node_modules/@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { API_CONSTANTS } from "../../constants/apiConstants";

interface props {
	onError: (e: any) => void;
	onSuccess: (data: any) => void;
}

export const SignInWidget = (props: props): JSX.Element => {
	const widgetRef = useRef(null);

	const { onSuccess, onError } = props;

	useEffect((): ReturnType<EffectCallback> => {
		if (widgetRef.current === null) {
			return;
		}

		const widget = new OktaSignIn({
			issuer: API_CONSTANTS.OKTA_APPLICAITON_URL + "/oauth2/default",
			clientId: API_CONSTANTS.OKTA_APPLICATION_CLIENT_ID,
			redirectUri: window.location.origin,
		});

		widget
			.showSignInToGetTokens({
				el: widgetRef.current,
			})
			.then(onSuccess)
			.catch(onError);

		return () => {
			widget.remove();
		};
	}, [onSuccess, onError]);

	return (
		<div
			style={{
				marginTop: 40,
			}}
			ref={widgetRef}
		/>
	);
};
