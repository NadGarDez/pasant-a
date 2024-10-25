import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listActiveItemInterface,
} from "../../types/reduxTypes";

const initialState: listActiveItemInterface = {
	data: null,
	status: "BLANK",
	error: null,
};

export const activeItem = createSlice({
	name: "activeItem",
	initialState,
	reducers: {
		successingActiveItemRequesAction: state => {
			state.status = "SUCCESS";
			state.data = null;
		},
		failActiveItemRequestAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		startActiveItemRequestAction: state => {
			state.status = "LOADING";
			state.error = null;
		},
		initializeActiveItem: (state, action: PayloadAction<object>) => {
			state.data = action.payload;
			state.status = "NEUTRAL";
			state.error = null;
		},
		clearActiveItem: state => {
			state.data = null;
			state.status = "BLANK";
			state.error = null;
		},
		neutralize: state => {
			state.status = "NEUTRAL";
		},
	},
});

export const {
	successingActiveItemRequesAction,
	failActiveItemRequestAction,
	startActiveItemRequestAction,
	initializeActiveItem,
	clearActiveItem,
	neutralize,
} = activeItem.actions;

export const activeitemSelector = (
	state: reduxStoreType,
): listActiveItemInterface => state.activeItem;

export default activeItem.reducer;
