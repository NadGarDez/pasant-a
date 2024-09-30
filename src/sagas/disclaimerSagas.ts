import { call, put, select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
import { getDisclaimers } from "../utils/apiRequest";
import { createAction, type PayloadAction } from "@reduxjs/toolkit";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";
import {
	failDisclaimersAction,
	loadDisclaimersAction,
	successDisclaimersAction,
} from "../redux/slicers/disclaimersSlice";
import { type disclaimer } from "../types/disclaimerTypes";

// sagas function

interface getDisclaimerssResponse {
	totalCount: number;
	items: disclaimer[];
}

function* getDisclaimersSagas(
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
			yield put(loadDisclaimersAction(action.payload));
			const result: AxiosResponse<getDisclaimerssResponse> = yield call(
				getDisclaimers,
				value.oktaSessionId,
				{
					index: action.payload.limit * action.payload.page,
					limit: action.payload.limit,
				},
			);
			yield put(successDisclaimersAction(result.data));
		} else {
			yield put(failDisclaimersAction("super error"));
		}
	} catch (error) {
		console.log(error);
		yield put(failDisclaimersAction("super error"));
	}
}

// watchers
export function* disclaimersWatcher(): any {
	yield takeEvery("GET_DISCLAIMERS", getDisclaimersSagas);
}

// action creators

export const getDisclaimersSagasAction = createAction<{
	page: number;
	limit: number;
}>("GET_DISCLAIMERS");
