import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";

interface appState {
	showSideBar: boolean;
}

const initialState: appState = {
	showSideBar: false,
};

export const appSlicer = createSlice({
	name: "appState",
	initialState,
	reducers: {
		toogleSideBar: state => {
			state.showSideBar = !state.showSideBar;
		},
		setSideBar: (state, action: PayloadAction<boolean>) => {
			state.showSideBar = action.payload;
		},
	},
});

export const { toogleSideBar, setSideBar } = appSlicer.actions;

export const sideBarSelector = (state: reduxStoreType): boolean =>
	state.appState.showSideBar;

export default appSlicer.reducer;
