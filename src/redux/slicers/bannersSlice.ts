import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
} from "../../types/reduxTypes";
import { type eventBanner } from "../../types/events";

const initialState: listReducerInterface<eventBanner> = {
	data: [],
	status: "NEUTRAL",
	error: null,
	totalCount: 0,
	page: 0,
	limit: 5,
};

export const bannersSlice = createSlice({
	name: "bannersSlice",
	initialState,
	reducers: {
		successBannersAction: (
			state,
			action: PayloadAction<{ items: eventBanner[]; totalCount: number }>,
		) => {
			console.log("banner success", action);
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failBannersAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadBannersAction: (
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

export const { loadBannersAction, failBannersAction, successBannersAction } =
	bannersSlice.actions;

export const bannersSelector = (
	state: reduxStoreType,
): listReducerInterface<eventBanner> => state.banners;

export default bannersSlice.reducer;
