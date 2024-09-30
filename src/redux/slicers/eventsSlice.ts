import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
} from "../../types/reduxTypes";
import { type event } from "../../types/events";

const initialState: listReducerInterface<event> = {
	data: [],
	status: "NEUTRAL",
	error: null,
	totalCount: 0,
	page: 0,
	limit: 5,
};

export const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		successEventsAction: (
			state,
			action: PayloadAction<{ items: event[]; totalCount: number }>,
		) => {
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failEventsAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadEventsAction: (
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

export const { loadEventsAction, failEventsAction, successEventsAction } =
	eventsSlice.actions;

export const eventsSelector = (
	state: reduxStoreType,
): listReducerInterface<event> => state.events;

export default eventsSlice.reducer;
