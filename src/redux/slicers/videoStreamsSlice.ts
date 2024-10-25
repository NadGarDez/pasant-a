import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
} from "../../types/reduxTypes";
import { type eventVideo } from "../../types/events";

const initialState: listReducerInterface<eventVideo> = {
	data: [],
	status: "NEUTRAL",
	error: null,
	totalCount: 0,
	page: 0,
	limit: 5,
};

export const videoStreamsSlice = createSlice({
	name: "videoStreamsSlice",
	initialState,
	reducers: {
		successVideoStreamsAction: (
			state,
			action: PayloadAction<{ items: eventVideo[]; totalCount: number }>,
		) => {
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failVideoStreamsAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadVideoStreamsAction: (
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
	loadVideoStreamsAction,
	failVideoStreamsAction,
	successVideoStreamsAction,
} = videoStreamsSlice.actions;

export const videoStreamsSelector = (
	state: reduxStoreType,
): listReducerInterface<eventVideo> => state.videos;

export default videoStreamsSlice.reducer;
