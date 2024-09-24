import { type eventStatus } from "./events";

interface drawerSubItem {
	text: string;
	url: (id: string) => string;
}

export interface drawerItem {
	text: string;
	icon: string;
	items: drawerSubItem[];
	hideForStates?: eventStatus[];
}

export interface CRDMenuItem {
	key: string;
	label: string;
	to: string;
}
