import { call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import {
	failEventsAction,
	loadEventsAction,
	successEventsAction,
} from "../redux/slicers/eventsSlice";
import { getEvents } from "../utils/apiRequest";
import { createAction, type PayloadAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";
import { type event } from "../types/events";

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
			console.log(result, "super result");
			yield put(successEventsAction(result.data));
		} else {
			yield put(failEventsAction("super error"));
		}
	} catch (error) {
		alert(JSON.stringify(error));
		console.log(error, "super error");
		yield put(failEventsAction("super error"));
	}
}

// watchers
export function* eventsWatcher(): any {
	yield takeEvery("GET_EVENTS", getEventsSaga);
}

// action creators

export const getEventsSagasAction = createAction<{
	page: number;
	limit: number;
}>("GET_EVENTS");
