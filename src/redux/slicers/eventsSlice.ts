import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
	listActiveItemInterface,
	eventslistReducerInterface,
} from "../../types/reduxTypes";
import { type event } from "../../types/events";

const activeItemInitialStatus: listActiveItemInterface<event> = {
	data: null,
	status: "BLANK",
	error: null,
};

const initialState: eventslistReducerInterface<event> = {
	data: [],
	status: "NEUTRAL",
	activeItem: activeItemInitialStatus,
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

		initializeActiveEventItemAction: (state, action: PayloadAction<event>) => {
			const activeItem: listActiveItemInterface<event> = {
				data: action.payload,
				status: "NEUTRAL",
				error: null,
			};

			state.activeItem = activeItem;
		},

		clearActiveEventAction: state => {
			state.activeItem = activeItemInitialStatus;
		},
		failReadActiveEventAction: (state, action: PayloadAction<string>) => {
			state.activeItem.status = "ERROR";
			state.activeItem.error = action.payload;
			state.activeItem.data = null;
		},
		loadReadActiveEventAction: state => {
			state.activeItem.status = "LOADING";
			state.activeItem.data = null;
			state.activeItem.data = null;
		},
		successReadActiveEventAction: (state, action: PayloadAction<event>) => {
			state.activeItem.status = "SUCCESS";
			state.activeItem.data = action.payload;
			state.activeItem.error = null;
		},
	},
});

export const {
	loadEventsAction,
	failEventsAction,
	successEventsAction,
	initializeActiveEventItemAction,
	clearActiveEventAction,
	failReadActiveEventAction,
	loadReadActiveEventAction,
	successReadActiveEventAction,
} = eventsSlice.actions;

export const eventsSelector = (
	state: reduxStoreType,
): listReducerInterface<event> => state.events;

export const activeEventSelector = (
	state: reduxStoreType,
): listActiveItemInterface<event> => state.events.activeItem;

export default eventsSlice.reducer;
