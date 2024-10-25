import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { reduxStoreType } from "../../types/reduxTypes";
import type { modalFormStatus } from "../../types/uiTypes";

interface appState {
	showSideBar: boolean;
	language: string;
	modal: modalFormStatus;
}

const initialState: appState = {
	showSideBar: false,
	language: "en",
	modal: "HIDDEN",
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
		hideModalForm: state => {
			state.modal = "HIDDEN";
		},
		startModalForm: (state, action: PayloadAction<modalFormStatus>) => {
			state.modal = action.payload;
		},
	},
});

export const {
	toogleSideBar,
	setSideBar,
	setLanguage,
	hideModalForm,
	startModalForm,
} = appSlicer.actions;

export const sideBarSelector = (state: reduxStoreType): boolean =>
	state.appState.showSideBar;

export const languageSelector = (state: reduxStoreType): string =>
	state.appState.language;

export const modalFormStatusSelector = (
	state: reduxStoreType,
): modalFormStatus => state.appState.modal;

export default appSlicer.reducer;
