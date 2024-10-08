import { type event } from "../types/events";
import { type hookVerbsInterface } from "../types/hooks";

// verbs hook design , in theory all the hook should have the same shape

export const useEventVerbs = (id: string): hookVerbsInterface<event> => {
	const put = (value: event): void => {
		// here despatch sagas action to put request
	};
	const post = (value: event): void => {
		// here despatch sagas action to post request
	};
	const del = (): void => {
		// here despatch sagas action to delete request
	};

	return {
		put,
		post,
		del,
	};
};
