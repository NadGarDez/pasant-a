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
} from "../redux/slicers/configsSlice";
import { type config } from "../types/configTypes";

// sagas function

interface getConfigsResponse {
	totalCount: number;
	items: config[];
}

function* getConfigsSagas(
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
			yield put(loadConfigsAction(action.payload));
			const result: AxiosResponse<getConfigsResponse> = yield call(
				getConfigs,
				value.oktaSessionId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
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
