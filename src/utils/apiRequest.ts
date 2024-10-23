import axios from "axios";
import { API_CONSTANTS } from "../constants/apiConstants";
import { type INTERNAL_LOGIN_REQUEST_PARAMS } from "../types/internalApiTypes";
import { type OktaAuth } from "@okta/okta-auth-js";

export const internalLoginRequest = async (
	data: INTERNAL_LOGIN_REQUEST_PARAMS,
): Promise<any> => {
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

export const getEvents = async (
	session: string,
	params: object,
): Promise<object> => {
	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/events/search`;
	return await axios.get(url, {
		headers: {
			Authorization: session,
		},
		params,
	});
};

export const getDisclaimers = async (
	session: string,
	params: object,
): Promise<object> => {
	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/disclaimers/v1/disclaimers`;
	return await axios.get(url, {
		headers: {
			Authorization: session,
		},
		params,
	});
};

export const getGroups = async (
	session: string,
	params: object,
): Promise<object> => {
	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/profile/v1/profiles`;
	return await axios.get(url, {
		headers: {
			Authorization: session,
		},
		params,
	});
};

export const getConfigs = async (
	session: string,
	params: object,
): Promise<object> => {
	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/utils/v1/configs/search`;
	return await axios.get(url, {
		headers: {
			Authorization: session,
		},
		params,
	});
};

export const getLatestVersion = async (
	session: string,
	params: object,
): Promise<object> => {
	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/versions/v1/latest`;
	return await axios.get(url, {
		headers: {
			Authorization: session,
		},
		params,
	});
};

export const getVersionsRequest = async (
	session: string,
	params: object,
): Promise<object> => {
	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/versions/v1/versions`;
	return await axios.get(url, {
		headers: {
			Authorization: session,
		},
		params,
	});
};

export const getEventRequest = async (
	session: string,
	eventId: string,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}`,
		{
			headers: {
				Authorization: session,
			},
		},
	);
};
export const getEventMetadataRequest = async (
	session: string,
	eventId: string,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/metadata`,
		{
			headers: {
				Authorization: session,
			},
		},
	);
};
export const getEventVersionRequest = async (
	session: string,
	eventId: string,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/version`,
		{
			headers: {
				Authorization: session,
			},
		},
	);
};
export const getEventBackupRequest = async (
	session: string,
	eventId: string,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/getBackupData`,
		{
			headers: {
				Authorization: session,
			},
		},
	);
};

export const saveImage = async (
	data: File,
): Promise<{
	remoteUrl: string;
}> => {
	return await new Promise(resolve => {
		setTimeout(() => {
			resolve({
				remoteUrl: "https://www.google.com",
			});
		}, 3000);
	});
};
