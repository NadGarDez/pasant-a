import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";

interface events {
	results: string[];
	anotherKey?: any;
}

const initialState: events = {
	results: ["event 1", "event 2"],
};

export const eventsSlice = createSlice({
	name: "events",
	initialState: initialState,
	reducers: {
		setEvents: (state, action: PayloadAction<string[]>) => {
			state.results = action.payload;
		},
	},
});

export const { setEvents } = eventsSlice.actions;

export const eventsSelector = (state: reduxStoreType): string[] =>
	state.events.results;

export default eventsSlice.reducer;
