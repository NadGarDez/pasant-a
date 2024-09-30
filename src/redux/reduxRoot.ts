import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slicers/eventsSlice";
import rootSaga from "../sagas/sagasRoot";
import createSagaMiddleware from "@redux-saga/core";
import internalSessionSlice from "./slicers/internalSessionSlice";
import appSlicer from "./slicers/appSlicer";
import currentEventSlice from "./slicers/currentEventSlice";
import configsSlice from "./slicers/configsSlice";
import disclaimersSlice from "./slicers/disclaimersSlice";

const sagaMiddleware = createSagaMiddleware();
export const reduxRoot = configureStore({
	reducer: {
		events: eventsSlice,
		configs: configsSlice,
		disclaimers: disclaimersSlice,
		internalSession: internalSessionSlice,
		appState: appSlicer,
		currentEvent: currentEventSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
