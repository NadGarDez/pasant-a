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

export const sectionsSlice = createSlice({
	name: "sectionsSlice",
	initialState,
	reducers: {
		successSectionsAction: (
			state,
			action: PayloadAction<{ items: eventBanner[]; totalCount: number }>,
		) => {
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failSectionsAAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadSectionsAAction: (
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
	loadSectionsAAction,
	failSectionsAAction,
	successSectionsAction,
} = sectionsSlice.actions;

export const sectionsSelector = (
	state: reduxStoreType,
): listReducerInterface<eventBanner> => state.sections;

export default sectionsSlice.reducer;
