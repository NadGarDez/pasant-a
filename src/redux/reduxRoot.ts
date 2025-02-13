import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slicers/eventsSlice";
import rootSaga from "../sagas/sagasRoot";
import createSagaMiddleware from "@redux-saga/core";
import internalSessionSlice from "./slicers/internalSessionSlice";
import appSlicer from "./slicers/appSlicer";
import configsSlice from "./slicers/configsSlice";
import disclaimersSlice from "./slicers/disclaimersSlice";
import groupsSlice from "./slicers/groupsSlice";
import versionsSlice from "./slicers/versionSlice";
import banners from "./slicers/bannersSlice";
import maps from "./slicers/MapsSlice";
import sections from "./slicers/sectionsSlice";
import videos from "./slicers/videoStreamsSlice";
import activeItem from "./slicers/activeItemSlicer";
import { type reduxStoreType } from "../types/reduxTypes";

const sagaMiddleware = createSagaMiddleware();
export const reduxRoot = configureStore({
	reducer: {
		events: eventsSlice,
		configs: configsSlice,
		disclaimers: disclaimersSlice,
		groups: groupsSlice,
		versions: versionsSlice,
		internalSession: internalSessionSlice,
		appState: appSlicer,
		banners,
		maps,
		sections,
		videos,
		activeItem,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

const testReucers = combineReducers({
	events: eventsSlice,
	configs: configsSlice,
	disclaimers: disclaimersSlice,
	groups: groupsSlice,
	versions: versionsSlice,
	internalSession: internalSessionSlice,
	appState: appSlicer,
	banners,
	maps,
	sections,
	videos,
	activeItem,
});

export function setupStore(preloadedState?: Partial<reduxStoreType>): any {
	return configureStore({
		reducer: testReucers,
		preloadedState,
	});
}

export type testRootState = ReturnType<typeof testReucers>;
export type testAppStore = ReturnType<typeof setupStore>;
sagaMiddleware.run(rootSaga);
