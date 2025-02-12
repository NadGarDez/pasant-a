import axios, { type AxiosResponse } from "axios";
import { API_CONSTANTS } from "../constants/apiConstants";
import { type INTERNAL_LOGIN_REQUEST_PARAMS } from "../types/internalApiTypes";
import { type OktaAuth } from "@okta/okta-auth-js";
import type { defaultApiResponse, ListResponse } from "../types/defaultTypes";
import { type eventBanner } from "../types/events";

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
				remoteUrl:
					"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
			});
		}, 3000);
	});
};

export const getBannersRequest = async (
	session: string,
	eventId: string,
	params: object,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/resources`,
		{
			headers: {
				Authorization: session,
			},
			params,
		},
	);
};

export const getVideostreamsRequest = async (
	session: string,
	eventId: string,
	params: object,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/livestreams/`,
		{
			headers: {
				Authorization: session,
			},
			params,
		},
	);
};

export const getSectionsRequest = async (
	session: string,
	eventId: string,
	params: object,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/sections/v1/event/${eventId}/sections`,
		{
			headers: {
				Authorization: session,
			},
			params,
		},
	);
};

export const getMapsRequest = async (
	session: string,
	eventId: string,
	params: object,
): Promise<object> => {
	return await axios.get(
		`${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/maps`,
		{
			headers: {
				Authorization: session,
			},
			params,
		},
	);
};

export const loadMoreRequest = async (
	params: Record<"token" | "url", string>,
): Promise<defaultApiResponse<ListResponse<object>>> => {
	const { token, url } = params;

	try {
		const { status, data, statusText } = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: {
					count: 0,
					next: null,
					previous: null,
					results: [],
				},
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: {
					count: 0,
					next: null,
					previous: null,
					results: [],
				},
				statusText: "Error inesperado",
			};
		}
	}
};

export const fudamentalPutRequest = async (
	params: Record<"token" | "bodyObject" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, eventId } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/`;

	try {
		const { status, statusText, data } = await axios.put(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);
		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const bannerPutRequest = async (
	params: Record<"token" | "bodyObject" | "bannerId" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, bannerId, eventId } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/resource/${bannerId}`;

	try {
		const { status, statusText, data } = await axios.put(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(data, status, "super");

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const listBannerPutRequest = async (params: {
	token: any;
	items: eventBanner[];
	eventId: string;
}): Promise<{
	errors: object[];
	results: object[];
}> => {
	const { items = [], token, eventId } = params;

	const promises: Array<Promise<any>> = [];

	items.forEach(item => {
		promises.push(
			(async () => {
				const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/resource/${item.idResource}`;
				const { status, statusText, data } = await axios.put(
					url,
					{
						...item,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				return {
					status,
					statusText,
					data,
				};
			})(),
		);
	});

	const results = await Promise.all(promises);

	const validResults = results.filter(result => !(result instanceof Error));
	const errorResults = results.filter(result => result instanceof Error);

	return {
		errors: errorResults,
		results: validResults,
	};
};

export const bannerPostRequest = async (
	params: Record<"token" | "bodyObject" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, eventId } = params;
	console.log(bodyObject);

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/resource`;

	try {
		const { status, statusText, data } = await axios.post(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const bannerDeleteRequest = async (
	params: Record<"token" | "eventId" | "bannerId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { token, eventId, bannerId } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/resource/${bannerId}`;

	try {
		const { status, statusText, data } = await axios.delete(
			url,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const videoPostRequest = async (
	params: Record<"token" | "bodyObject" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, eventId } = params;

	console.log(bodyObject, "object");

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/livestream`;

	try {
		const { status, statusText, data } = await axios.post(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(data, status, "super");

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const videoPutRequest = async (
	params: Record<"token" | "bodyObject" | "videoId" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, videoId, eventId } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/livestreams/${videoId}`;

	try {
		const { status, statusText, data } = await axios.put(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(data, status, "super");

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const videoDeleteRequest = async (
	params: Record<"token" | "eventId" | "videoId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { token, eventId, videoId } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/livestreams/${videoId}`;

	try {
		const { status, statusText, data } = await axios.delete(
			url,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const managePutRequest = async (
	params: Record<"token" | "bodyObject" | "idSection" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, idSection, eventId } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/sections/v1/event/${eventId}/sections/${idSection}?loading=true`;

	try {
		const { status, statusText, data } = await axios.put(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(data, status, "super");

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const managePostRequest = async (
	params: Record<"token" | "bodyObject" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, eventId } = params;
	console.log(bodyObject);

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/sections/v1/event/${eventId}/sections`;

	try {
		const { status, statusText, data } = await axios.post(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const manageDeleteRequest = async (
	params: Record<"token" | "eventId" | "idSection", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { token, eventId, idSection } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/sections/v1/event/${eventId}/maps/${idSection}`;

	try {
		const { status, statusText, data } = await axios.delete(
			url,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const mapPutRequest = async (
	params: Record<"token" | "bodyObject" | "idEventMap" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, idEventMap, eventId } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/maps/${idEventMap}`;

	try {
		const { status, statusText, data } = await axios.put(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(data, status, "super");

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const mapPostRequest = async (
	params: Record<"token" | "bodyObject" | "eventId", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { bodyObject, token, eventId } = params;
	console.log(bodyObject);

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/maps`;

	try {
		const { status, statusText, data } = await axios.post(
			url,
			{
				...bodyObject,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};

export const mapDeleteRequest = async (
	params: Record<"token" | "eventId" | "idEventMap", any>,
): Promise<defaultApiResponse<object | null>> => {
	const { token, eventId, idEventMap } = params;

	const url = `${API_CONSTANTS.BACKEND_DEV_BASE_URL}/_ah/api/event/v1/event/${eventId}/maps/${idEventMap}`;

	try {
		const { status, statusText, data } = await axios.delete(
			url,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		console.log(status, data);

		return {
			status,
			data,
			statusText,
		};
	} catch (error: any) {
		if (error.response !== undefined) {
			const { data, status } = error.response as AxiosResponse;
			return {
				status,
				data: null,
				statusText: data.detail,
			};
		} else {
			return {
				status: 500,
				data: null,
				statusText: "Error inesperado",
			};
		}
	}
};
