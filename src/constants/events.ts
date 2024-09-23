import { type eventStatus } from "../types/events";

export const EVENTS_STATUS: Record<eventStatus, string> = {
	TO_SETUP: "TO_SETUP",
	PUBLISHED: "PUBLISHED",
	READY: "READY",
	INACTIVE: "INACTIVE",
};
