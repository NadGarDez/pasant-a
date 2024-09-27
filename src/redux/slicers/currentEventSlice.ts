import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";
import { type event } from "../../types/events";

interface initialType {
	event: event | null;
}

const initialState: initialType = {
	event: null,
};

export const eventSlice = createSlice({
	name: "currentEvent",
	initialState,
	reducers: {
		setEvent: (state, action: PayloadAction<event>) => {
			state.event = action.payload;
		},
	},
});

export const { setEvent } = eventSlice.actions;

export const currentEventSelector = (state: reduxStoreType): event | null =>
	state.currentEvent.event;

export default eventSlice.reducer;
