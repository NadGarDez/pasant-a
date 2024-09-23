export type eventStatus = "TO_SETUP" | "PUBLISHED" | "READY" | "INACTIVE";

export interface event {
	id: string;
}

export interface eventsSliceInterface {
	currentEvent: event;
	results: event[];
}
