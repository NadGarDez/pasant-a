import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
} from "../../types/reduxTypes";
import { type version } from "../../types/versionTypes";

const initialState: listReducerInterface<version> = {
	data: [],
	status: "NEUTRAL",
	error: null,
	totalCount: 0,
	page: 0,
	limit: 5,
};

export const versionsSlice = createSlice({
	name: "versions",
	initialState,
	reducers: {
		successVersionsAction: (
			state,
			action: PayloadAction<{ items: version[]; totalCount: number }>,
		) => {
			console.log("success");
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failVersionsAction: (state, action: PayloadAction<string>) => {
			console.log("fail");
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadVersionsAction: (
			state,
			action: PayloadAction<{ page: number; limit: number }>,
		) => {
			console.log("load", action);
			state.status = "LOADING";
			state.page = action.payload.page;
			state.limit = action.payload.limit;
			state.data = [];
			state.error = null;
		},
	},
});

export const { loadVersionsAction, failVersionsAction, successVersionsAction } =
	versionsSlice.actions;

export const versionsSelector = (
	state: reduxStoreType,
): listReducerInterface<version> => state.versions;

export default versionsSlice.reducer;
