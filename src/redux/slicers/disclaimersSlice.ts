import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
	listActiveItemInterface,
} from "../../types/reduxTypes";
import { type disclaimer } from "../../types/disclaimerTypes";

const activeItemInitialStatus: listActiveItemInterface<disclaimer> = {
	data: null,
	status: "BLANK",
	error: null,
};

const initialState: listReducerInterface<disclaimer> = {
	data: [],
	status: "NEUTRAL",
	activeItem: activeItemInitialStatus,
	error: null,
	totalCount: 0,
	page: 0,
	limit: 5,
};

export const disclaimersSlice = createSlice({
	name: "disclaimer",
	initialState,
	reducers: {
		successDisclaimersAction: (
			state,
			action: PayloadAction<{ items: disclaimer[]; totalCount: number }>,
		) => {
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failDisclaimersAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadDisclaimersAction: (
			state,
			action: PayloadAction<{ page: number; limit: number }>,
		) => {
			state.status = "LOADING";
			state.page = action.payload.page;
			state.limit = action.payload.limit;
			state.data = [];
			state.error = null;
		},
	},
});

export const {
	loadDisclaimersAction,
	failDisclaimersAction,
	successDisclaimersAction,
} = disclaimersSlice.actions;

export const disclaimersSelector = (
	state: reduxStoreType,
): listReducerInterface<disclaimer> => state.disclaimers;

export default disclaimersSlice.reducer;
