import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";
import {
	type fullDataInterface,
	type currentEvent,
	type event,
} from "../../types/events";

const initialState: currentEvent = {
	baseEvent: null,
	status: "NEUTRAL",
	error: null,
	fullData: null,
};

export const eventSlice = createSlice({
	name: "currentEvent",
	initialState,
	reducers: {
		setBaseEvent: (state, action: PayloadAction<event>) => {
			state.baseEvent = action.payload;
		},
		clearCurrentEvent: state => {
			state.baseEvent = null;
			state.fullData = null;
			state.error = null;
		},
		successReadEventAction: (
			state,
			action: PayloadAction<fullDataInterface>,
		) => {
			state.status = "SUCCESS";
			state.fullData = action.payload;
		},
		failReadEventAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadReadEventAction: state => {
			state.status = "LOADING";
			state.fullData = null;
			state.error = null;
		},
	},
});

export const {
	setBaseEvent,
	clearCurrentEvent,
	successReadEventAction,
	failReadEventAction,
	loadReadEventAction,
} = eventSlice.actions;

export const baseEventSelector = (state: reduxStoreType): event | null =>
	state.currentEvent.baseEvent;

export const currentEventSelector = (state: reduxStoreType): currentEvent =>
	state.currentEvent;

export default eventSlice.reducer;
