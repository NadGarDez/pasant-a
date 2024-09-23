import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";
import { type event, type eventsSliceInterface } from "../../types/events";

const initialState: eventsSliceInterface = {
	results: [],
	currentEvent: {
		id: "2",
	},
};

export const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		setEvents: (state, action: PayloadAction<event[]>) => {
			state.results = action.payload;
		},
	},
});

export const { setEvents } = eventsSlice.actions;

export const eventsSelector = (state: reduxStoreType): event[] =>
	state.events.results;
export const currentEventSelector = (state: reduxStoreType): event | null =>
	state.events.currentEvent;

export default eventsSlice.reducer;
