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
			};
		}

		case "FILL": {
			return {
				...state,
				status: "FILLED",
				preview: payload,
			};
		}

		case "FAIL": {
			return {
				...state,
				status: "ERROR",
				errorMessage: payload,
			};
		}

		case "REFILL": {
			return {
				...initialState,
				status: "FILLED",
				preview: payload,
			};
		}

		default:
			return state;
	}
};
