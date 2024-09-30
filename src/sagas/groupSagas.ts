import { call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import { getGroups } from "../utils/apiRequest";
import { createAction, type PayloadAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";
import { type config } from "../types/configTypes";
import {
	failGroupsAction,
	loadGroupsAction,
	successGroupsAction,
} from "../redux/slicers/groupsSlice";

// sagas function

interface getGroupsResponse {
	totalCount: number;
	items: config[];
}

function* getGroupsSagas(
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
			yield put(loadGroupsAction(action.payload));
			const result: AxiosResponse<getGroupsResponse> = yield call(
				getGroups,
				value.oktaSessionId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			yield put(successGroupsAction(result.data));
		} else {
			yield put(failGroupsAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failGroupsAction("super error"));
	}
}

// watchers
export function* groupsWatcher(): any {
	yield takeEvery("GET_GROUPS", getGroupsSagas);
}

// action creators

export const getGroupsSagasAction = createAction<{
	page: number;
	limit: number;
}>("GET_GROUPS");
