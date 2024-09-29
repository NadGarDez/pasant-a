import { call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import {
	failEventsAction,
	loadEventsAction,
	successEventsAction,
} from "../redux/slicers/eventsSlice";
import { getEvents } from "../utils/apiRequest";
import { createAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";
import { type event } from "../types/events";

// sagas function

interface getEventsResponse {
	totalCount: number;
	items: event[];
}

function* getEventsSaga(): object {
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadEventsAction());
			const result: AxiosResponse<getEventsResponse> = yield call(
				getEvents,
				value.oktaSessionId,
				{},
			);
			yield put(successEventsAction(result.data.items));
		} else {
			yield put(failEventsAction("super error"));
		}
	} catch (error) {
		console.log(error, "super error");
		yield put(failEventsAction("super error"));
	}
}

// watchers
export function* eventsWatcher(): any {
	yield takeEvery("GET_EVENTS", getEventsSaga);
}

// action creators

export const getEventsSagasAction = createAction("GET_EVENTS");
