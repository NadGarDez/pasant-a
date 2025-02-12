import { useReducer } from "react";
import { type defaultApiResponse } from "../types/defaultTypes";

interface requestStatus<T> {
	reducerStatus: "INITIAL" | "LOADING" | "SUCCESSED" | "ERROR";
	responseObject: defaultApiResponse<T> | null;
}

interface methods<T> {
	refetch: (params: {
		token: any;
		items: T[];
		eventId: string;
	}) => Promise<undefined>;
	clear: () => void;
}

interface action {
	name: string;
	payload: any;
}

function reducer<T extends object>(
	state: requestStatus<T>,
	action: action,
): requestStatus<T> {
	switch (action.name) {
		case "startRequest": {
			return {
				...state,
				reducerStatus: "LOADING",
			};
		}
		case "finishRequestSuccessfully": {
			return {
				...state,
				reducerStatus: "SUCCESSED",
				responseObject: action.payload,
			};
		}
		case "finishRequestWithError": {
			return {
				...state,
				reducerStatus: "ERROR",
				responseObject: action.payload,
			};
		}

		case "clear": {
			return {
				reducerStatus: "INITIAL",
				responseObject: null,
			};
		}

		default:
			return state;
	}
}

export const useLocalMultiRequest = <T extends object>(
	request: (params: { token: any; items: T[]; eventId: string }) => Promise<{
		errors: object[];
		results: object[];
	}>,
): requestStatus<T> & methods<T> => {
	const [state, dispatch] = useReducer(reducer<T>, {
		reducerStatus: "INITIAL",
		responseObject: null,
	});

	const refetch = async (params: {
		token: any;
		items: T[];
		eventId: string;
	}): Promise<undefined> => {
		dispatch({
			name: "startRequest",
			payload: undefined,
		});
		try {
			const { errors, results } = await request(params);
			if (errors.length > 0) {
				dispatch({
					name: "finishRequestWithError",
					payload: errors,
				});
			} else {
				dispatch({
					name: "finishRequestSuccessfully",
					payload: results,
				});
			}
		} catch (e) {
			dispatch({
				name: "finishRequestWithError",
				payload: "Unexpected error",
			});
		}
	};

	const clear = (): undefined => {
		dispatch({
			name: "clear",
			payload: undefined,
		});
	};

	return {
		...state,
		refetch,
		clear,
	};
};
