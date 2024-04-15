import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slicers/eventsSlice";

export const reduxRoot = configureStore({
	reducer: {
		events: eventsSlice,
	},
});
