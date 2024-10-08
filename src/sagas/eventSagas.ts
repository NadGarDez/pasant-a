import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import {
	failEventsAction,
	failReadActiveEventAction,
	loadEventsAction,
	loadReadActiveEventAction,
	successEventsAction,
	successReadActiveEventAction,
} from "../redux/slicers/eventsSlice";
import {
	getEventMetadataRequest,
	getEventRequest,
	getEvents,
	getEventVersionRequest,
} from "../utils/apiRequest";
import { createAction, type PayloadAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosError, type AxiosResponse } from "axios";
import { type fullDataInterface, type event } from "../types/events";

// sagas function

interface getEventsResponse {
	totalCount: number;
	items: event[];
}

function* getEventsSaga(
	action: PayloadAction<{
		page: number;
		limit: number;
	}>,
): object {
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadEventsAction(action.payload));
			const result: AxiosResponse<getEventsResponse> = yield call(
				getEvents,
				value.oktaSessionId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			yield put(successEventsAction(result.data));
		} else {
			yield put(failEventsAction("super error"));
		}
	} catch (error) {
		const axiosError = error as AxiosError;
		yield put(failEventsAction(axiosError.message));
	}
}

function* getFullEventInformationSagas(action: PayloadAction<string>): object {
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadReadActiveEventAction());
			const [a, b, c]: AxiosResponse[] = yield all([
				call(getEventRequest, value.oktaSessionId, action.payload),
				call(getEventVersionRequest, value.oktaSessionId, action.payload),
				call(getEventMetadataRequest, value.oktaSessionId, action.payload),
			]);

			const results: fullDataInterface = {
				...a.data,
				...b.data,
				...c.data,
			};
			yield put(successReadActiveEventAction(results));
		} else {
			yield put(failReadActiveEventAction("Unauthenticate"));
		}
	} catch (error) {
		const axiosError = error as AxiosError;
		yield put(failReadActiveEventAction(axiosError.message));
	}
}

// watchers
export function* eventsWatcher(): any {
	yield takeEvery("GET_EVENTS", getEventsSaga);
	yield takeEvery("GET_FULL_EVENT_INFORMATION", getFullEventInformationSagas);
}

// action creators

export const getEventsSagasAction = createAction<{
	page: number;
	limit: number;
}>("GET_EVENTS");

export const getFullEventSagasAction = createAction<string>(
	"GET_FULL_EVENT_INFORMATION",
);
