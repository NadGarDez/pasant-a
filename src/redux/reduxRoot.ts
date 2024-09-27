import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slicers/eventsSlice";
import rootSaga from "../sagas/sagasRoot";
import createSagaMiddleware from "@redux-saga/core";
import internalSessionSlice from "./slicers/internalSessionSlice";
import appSlicer from "./slicers/appSlicer";
import currentEventSlice from "./slicers/currentEventSlice";

const sagaMiddleware = createSagaMiddleware();
export const reduxRoot = configureStore({
	reducer: {
		events: eventsSlice,
		internalSession: internalSessionSlice,
		appState: appSlicer,
		currentEvent: currentEventSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
