export type eventStatus = "TO_SETUP" | "PUBLISHED" | "READY" | "INACTIVE";
export type eventReducerStatus = "NEUTRAL" | "LOADING" | "SUCCESS" | "ERROR";

export interface event {
	id: string;
}

export interface eventsSliceInterface {
	status: eventReducerStatus;
	data: event[];
	error: string | null;
}
