import { call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import {
	getBannersRequest,
	getMapsRequest,
	getSectionsRequest,
	getVideostreamsRequest,
} from "../utils/apiRequest";
import { createAction, type PayloadAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";
import {
	failBannersAction,
	loadBannersAction,
	successBannersAction,
} from "../redux/slicers/bannersSlice";
import {
	type eventMap,
	type eventBanner,
	type eventSection,
	type eventVideo,
} from "../types/events";
import {
	failVideoStreamsAction,
	loadVideoStreamsAction,
	successVideoStreamsAction,
} from "../redux/slicers/videoStreamsSlice";
import {
	failMapsAction,
	loadMapsAction,
	successMapsAction,
} from "../redux/slicers/MapsSlice";
import {
	failSectionsAAction,
	loadSectionsAAction,
	successSectionsAction,
} from "../redux/slicers/sectionsSlice";

// sagas function

interface getGroupsResponse<T> {
	totalCount: number;
	items: T[];
}

function* getBannersSagas(
	action: PayloadAction<{
		eventId: string;
		page: number;
		limit: number;
	}>,
): object {
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	console.log(action, "hey");
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadBannersAction(action.payload));
			const result: AxiosResponse<getGroupsResponse<eventBanner>> = yield call(
				getBannersRequest,
				value.oktaSessionId,
				action.payload.eventId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			console.log(result, "results");
			yield put(successBannersAction(result.data));
		} else {
			console.log("error");
			yield put(failBannersAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failBannersAction("super error"));
	}
}

function* getVideoStreamsSagas(
	action: PayloadAction<{
		eventId: string;
		page: number;
		limit: number;
	}>,
): object {
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	console.log(action, "hey");
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadVideoStreamsAction(action.payload));
			const result: AxiosResponse<getGroupsResponse<eventVideo>> = yield call(
				getVideostreamsRequest,
				value.oktaSessionId,
				action.payload.eventId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			console.log(result, "results");
			yield put(successVideoStreamsAction(result.data));
		} else {
			console.log("error");
			yield put(failVideoStreamsAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failVideoStreamsAction("super error"));
	}
}

function* getMapsSagas(
	action: PayloadAction<{
		eventId: string;
		page: number;
		limit: number;
	}>,
): object {
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	console.log(action, "hey");
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadMapsAction(action.payload));
			const result: AxiosResponse<getGroupsResponse<eventMap>> = yield call(
				getMapsRequest,
				value.oktaSessionId,
				action.payload.eventId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			console.log(result, "results");
			yield put(successMapsAction(result.data));
		} else {
			console.log("error");
			yield put(failMapsAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failMapsAction("super error"));
	}
}

function* getSectionsSagas(
	action: PayloadAction<{
		eventId: string;
		page: number;
		limit: number;
	}>,
): object {
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	console.log(action, "hey");
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadSectionsAAction(action.payload));
			const result: AxiosResponse<getGroupsResponse<eventSection>> = yield call(
				getSectionsRequest,
				value.oktaSessionId,
				action.payload.eventId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			console.log(result, "results");
			yield put(successSectionsAction(result.data));
		} else {
			console.log("error");
			yield put(failSectionsAAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failSectionsAAction("super error"));
	}
}

// watchers
export function* eventSubitemWatcher(): any {
	yield takeEvery("GET_BANNERS", getBannersSagas);
	yield takeEvery("GET_VIDEO_STREAMS", getVideoStreamsSagas);
	yield takeEvery("GET_MAPS", getMapsSagas);
	yield takeEvery("GET_SECTIONS", getSectionsSagas);
}

// action creators

export const getBannersSagasAction = createAction<{
	page: number;
	limit: number;
	eventId: string;
}>("GET_BANNERS");

export const getVideoStreamsSagasAction = createAction<{
	page: number;
	limit: number;
	eventId: string;
}>("GET_VIDEO_STREAMS");

export const getMapsSagasActions = createAction<{
	page: number;
	limit: number;
	eventId: string;
}>("GET_MAPS");

export const getSectionsSagasActions = createAction<{
	page: number;
	limit: number;
	eventId: string;
}>("GET_SECTIONS");
