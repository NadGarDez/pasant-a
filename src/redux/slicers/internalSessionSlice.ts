import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	type internalSessionReducerInteface,
	type INTERNAL_LOGIN_REQUEST_PARAMS,
} from "../../types/internalApiTypes";
import { type reduxStoreType } from "../../types/reduxTypes";

const initialState: internalSessionReducerInteface = {
	oktaSessionId: null,
	userId: null,
	status: "UNAUTHENTICATED",
};

export const internalSessionSlice = createSlice({
	name: "internalSession",
	initialState,
	reducers: {
		startAuthentication: (
			state,
			action: PayloadAction<{ accessToken: string }>,
		) => {
			state.status = "AUTHENTICATING";
		},
		finishAuthenticationWithErrror: (
			state,
			action: PayloadAction<{ error: string }>,
		) => {
			state.status = "AUTHENTICATION_ERROR";
			state.errorMesssage = action.payload.error;
		},
		finishAuthenticationWithSuccess: (
			state,
			action: PayloadAction<{ oktaSessionId: string; userId: string }>,
		) => {
			state.oktaSessionId = action.payload.oktaSessionId;
			state.userId = action.payload.userId;
			state.status = "AUTHENTICATED";
		},
		clearInternalSession: state => {
			state.oktaSessionId = null;
			state.userId = null;
			state.errorMesssage = undefined;
			state.status = "UNAUTHENTICATED";
		},
	},
});

export const {
	startAuthentication,
	finishAuthenticationWithErrror,
	finishAuthenticationWithSuccess,
	clearInternalSession,
} = internalSessionSlice.actions;

export const startAuthSagas = (
	data: INTERNAL_LOGIN_REQUEST_PARAMS,
): PayloadAction<INTERNAL_LOGIN_REQUEST_PARAMS> => ({
	type: "SAGAS_INTERNAL_LOGIN",
	payload: data,
});

export const internalSessionSelector = (
	state: reduxStoreType,
): internalSessionReducerInteface => state.internalSession;

export default internalSessionSlice.reducer;
