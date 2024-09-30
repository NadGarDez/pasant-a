import { call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import { getConfigs } from "../utils/apiRequest";
import { createAction, type PayloadAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";
import {
	failConfigsAction,
	loadConfigsAction,
	successConfigsAction,
} from "../redux/slicers/configSlice";
import { type config } from "../types/configTypes";

// sagas function

interface getEventsResponse {
	totalCount: number;
	items: config[];
}

function* getConfigsSagas(
	action: PayloadAction<{
		page: number;
		limit: number;
	}>,
): object {
	console.log("get configs sagas");
	const value: internalSessionReducerInteface = yield select(
		internalSessionSelector,
	);
	console.log("here", value);
	try {
		if (value.oktaSessionId !== null) {
			yield put(loadConfigsAction(action.payload));
			const result: AxiosResponse<getEventsResponse> = yield call(
				getConfigs,
				value.oktaSessionId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			console.log(result, "sagas");
			yield put(successConfigsAction(result.data));
		} else {
			yield put(failConfigsAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failConfigsAction("super error"));
	}
}

// watchers
export function* configsWatcher(): any {
	yield takeEvery("GET_CONFIGS", getConfigsSagas);
}

// action creators

export const getConfigsSagasAction = createAction<{
	page: number;
	limit: number;
}>("GET_CONFIGS");
