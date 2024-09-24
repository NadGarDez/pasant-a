import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";

interface appState {
	showSideBar: boolean;
	language: string;
}

const initialState: appState = {
	showSideBar: false,
	language: "en",
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
		setLanguage: (state, action: PayloadAction<string>) => {
			state.language = action.payload;
		},
	},
});

export const { toogleSideBar, setSideBar, setLanguage } = appSlicer.actions;

export const sideBarSelector = (state: reduxStoreType): boolean =>
	state.appState.showSideBar;

export const languageSelector = (state: reduxStoreType): string =>
	state.appState.language;

export default appSlicer.reducer;
