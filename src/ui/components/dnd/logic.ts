import type { dndAction, dndInterface } from "./types";

export const initialState: dndInterface = {
	errorMessage: null,
	preview: null,
	status: "VOID",
};

export const reducer = (
	state: dndInterface,
	action: dndAction,
): dndInterface => {
	const { type, payload = "" } = action;

	switch (type) {
		case "NEUTRALIZE": {
			return { ...initialState };
		}

		case "LOAD": {
			return {
				...state,
				status: "LOADING",
				preview: payload,
			};
		}

		case "FILL": {
			return {
				...state,
				status: "FILLED",
			};
		}

		case "FAIL": {
			return {
				...state,
				status: "ERROR",
				errorMessage: payload,
			};
		}

		default:
			return state;
	}
};
