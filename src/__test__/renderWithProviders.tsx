import React, { type PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

// As a basic setup, import your same slice reducers
import {
	setupStore,
	type testAppStore,
	type testRootState,
} from "../redux/reduxRoot";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<testRootState>;
	store?: testAppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	extendedRenderOptions: ExtendedRenderOptions = {},
): any {
	const {
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		...renderOptions
	} = extendedRenderOptions;

	const Wrapper = ({ children }: PropsWithChildren): any => (
		<Provider store={store}>{children}</Provider>
	);

	// Return an object with the store and all of RTL's query functions
	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}
