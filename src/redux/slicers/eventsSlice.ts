import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";
import { type event, type eventsSliceInterface } from "../../types/events";

const initialState: eventsSliceInterface = {
	data: [],
	status: "NEUTRAL",
	error: null,
};

export const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		successEventsAction: (state, action: PayloadAction<event[]>) => {
			state.status = "SUCCESS";
			state.data = action.payload;
		},
		failEventsAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadEventsAction: state => {
			state.status = "LOADING";
			state.data = [];
			state.error = null;
		},
	},
});

export const { loadEventsAction, failEventsAction, successEventsAction } =
	eventsSlice.actions;

export const eventsSelector = (state: reduxStoreType): eventsSliceInterface =>
	state.events;

export default eventsSlice.reducer;
