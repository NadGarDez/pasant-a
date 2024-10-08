import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
	listActiveItemInterface,
} from "../../types/reduxTypes";
import { type version } from "../../types/versionTypes";

const activeItemInitialStatus: listActiveItemInterface<version> = {
	data: null,
	status: "BLANK",
	error: null,
};

const initialState: listReducerInterface<version> = {
	data: [],
	status: "NEUTRAL",
	activeItem: activeItemInitialStatus,
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
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failVersionsAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadVersionsAction: (
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

export const { loadVersionsAction, failVersionsAction, successVersionsAction } =
	versionsSlice.actions;

export const versionsSelector = (
	state: reduxStoreType,
): listReducerInterface<version> => state.versions;

export default versionsSlice.reducer;
