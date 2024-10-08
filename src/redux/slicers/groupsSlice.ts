import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	reduxStoreType,
	listReducerInterface,
	listActiveItemInterface,
} from "../../types/reduxTypes";
import type { group } from "../../types/groupTypes";

const activeItemInitialStatus: listActiveItemInterface<group> = {
	data: null,
	status: "BLANK",
	error: null,
};

const initialState: listReducerInterface<group> = {
	data: [],
	status: "NEUTRAL",
	activeItem: activeItemInitialStatus,
	error: null,
	totalCount: 0,
	page: 0,
	limit: 5,
};

export const groupSlice = createSlice({
	name: "groups",
	initialState,
	reducers: {
		successGroupsAction: (
			state,
			action: PayloadAction<{ items: group[]; totalCount: number }>,
		) => {
			state.status = "SUCCESS";
			state.data = action.payload.items;
			state.totalCount = action.payload.totalCount;
		},
		failGroupsAction: (state, action: PayloadAction<string>) => {
			state.status = "ERROR";
			state.error = action.payload;
		},
		loadGroupsAction: (
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

export const { successGroupsAction, failGroupsAction, loadGroupsAction } =
	groupSlice.actions;

export const groupsSelector = (
	state: reduxStoreType,
): listReducerInterface<group> => state.groups;

export default groupSlice.reducer;
