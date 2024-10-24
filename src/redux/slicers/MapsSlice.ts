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

export const mapsSlice = createSlice({
	name: "videoStreamsSlice",
	initialState,
	reducers: {
		successMapsAction: (
			state,
			action: PayloadAction<{ items: eventBanner[]; totalCount: number }>,
		) => {
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failMapsAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadMapsAction: (
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

export const { loadMapsAction, failMapsAction, successMapsAction } =
	mapsSlice.actions;

export const mapsSelector = (
	state: reduxStoreType,
): listReducerInterface<eventBanner> => state.maps;

export default mapsSlice.reducer;
