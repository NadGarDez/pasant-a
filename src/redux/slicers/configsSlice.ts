import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
	listActiveItemInterface,
} from "../../types/reduxTypes";
import { type config } from "../../types/configTypes";

const activeItemInitialStatus: listActiveItemInterface<config> = {
	data: null,
	status: "BLANK",
	error: null,
};

const initialState: listReducerInterface<config> = {
	data: [],
	status: "NEUTRAL",
	activeItem: activeItemInitialStatus,
	error: null,
	totalCount: 0,
	page: 0,
	limit: 5,
};

export const configsSlice = createSlice({
	name: "configs",
	initialState,
	reducers: {
		successConfigsAction: (
			state,
			action: PayloadAction<{ items: config[]; totalCount: number }>,
		) => {
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failConfigsAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadConfigsAction: (
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

export const { loadConfigsAction, failConfigsAction, successConfigsAction } =
	configsSlice.actions;

export const configsSelector = (
	state: reduxStoreType,
): listReducerInterface<config> => state.configs;

export default configsSlice.reducer;
