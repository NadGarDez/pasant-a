import { call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import { getVersionsRequest } from "../utils/apiRequest";
import { createAction, type PayloadAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";
import { type version } from "../types/versionTypes";
import {
	failVersionsAction,
	loadVersionsAction,
	successVersionsAction,
} from "../redux/slicers/versionSlice";

// sagas function

interface getVersionsResponse {
	totalCount: number;
	items: version[];
}

function* getVersionsSagas(
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
			yield put(loadVersionsAction(action.payload));
			const result: AxiosResponse<getVersionsResponse> = yield call(
				getVersionsRequest,
				value.oktaSessionId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			console.log(result, "result");
			yield put(successVersionsAction(result.data));
		} else {
			yield put(failVersionsAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failVersionsAction("super error"));
	}
}

// watchers
export function* versionWatcher(): any {
	yield takeEvery("GET_VERSIONS", getVersionsSagas);
}

// action creators

export const getVersionsSagasAction = createAction<{
	page: number;
	limit: number;
}>("GET_VERSIONS");
