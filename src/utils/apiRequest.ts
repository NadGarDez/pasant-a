import axios from "axios";
import { API_CONSTANTS } from "../constants/apiConstants";
import { type INTERNAL_LOGIN_REQUEST_PARAMS } from "../types/internalApiTypes";
import { type OktaAuth } from "@okta/okta-auth-js";

export const internalLoginRequest = async (
	data: INTERNAL_LOGIN_REQUEST_PARAMS,
): Promise<object> => {
	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/session/v1/session`;
	return await axios.post(url, data);
};

export const getLoginInternalRequestFromAuthState = async (
	oktaAuth: OktaAuth,
): Promise<INTERNAL_LOGIN_REQUEST_PARAMS> => {
	const accessToken = oktaAuth.getAccessToken();
	const session = (await oktaAuth.session.get()) as unknown as { id: string };
	const { sub: userId } = await oktaAuth.getUser();

	return {
		accessToken: accessToken ?? "",
		userId: userId ?? "",
		oktaSessionId: session.id ?? "",
	};
};
