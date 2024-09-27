import { all, call, put, takeEvery } from "redux-saga/effects";
import {
	finishAuthenticationWithErrror,
	finishAuthenticationWithSuccess,
	startAuthentication,
} from "../redux/slicers/internalSessionSlice";
import { type PayloadAction } from "@reduxjs/toolkit";
import { internalLoginRequest } from "../utils/apiRequest";
import { type INTERNAL_LOGIN_REQUEST_PARAMS } from "../types/internalApiTypes";
import { type AxiosResponse } from "axios";

interface responseInterface {
	userId: string;
	oktaSessionId: string;
	accessToken: string;
}

function* internalLogin(
	action: PayloadAction<INTERNAL_LOGIN_REQUEST_PARAMS>,
): object {
	yield put(startAuthentication({ accessToken: action.payload.accessToken }));

	try {
		const object: AxiosResponse<responseInterface> = yield call(
			internalLoginRequest,
			action.payload,
		);
		const { data } = object;
		yield put(finishAuthenticationWithSuccess(data));
	} catch (e: any) {
		yield put(
			finishAuthenticationWithErrror({
				error: e.message,
			}),
		);
	}
}

function* watchInternalApiFech(): any {
	yield takeEvery("SAGAS_INTERNAL_LOGIN", internalLogin);
}

export default function* internalApi(): any {
	yield all([watchInternalApiFech()]);
}
