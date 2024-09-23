import { type drawerItem } from "../types/drawer";

export const items: drawerItem[] = [
	{
		text: "General",
		icon: "info",
		items: [
			{
				text: "Overview",
				url: id => `/event/${id}/overview`,
			},
		],
	},
	{
		text: "Setup your app",
		icon: "settings",
		items: [
			{
				text: "App fundamentals",
				url: id => `/event/${id}/fundamentals`,
			},
			{
				text: "Configuration",
				url: id => `/event/${id}/configuration`,
			},
		],
	},
	{
		text: "Children",
		icon: "map",
		items: [
			{
				text: "Set Children",
				url: () => "#",
			},
		],
		hideForStates: ["INACTIVE", "PUBLISHED", "READY"],
	},
	{
		text: "Manage content",
		icon: "perm_media",
		items: [
			{
				text: "Advertisement",
				url: id => `/event/${id}/advertisements`,
			},
			{
				text: "Topics",
				url: id => `/event/${id}/topics`,
			},
			{
				text: "Video Streams",
				url: id => `/event/${id}/livestreams`,
			},
			{
				text: "Static Polls",
				url: id => `/event/${id}/polls`,
			},
		],
		hideForStates: ["TO_SETUP"],
	},
	{
		text: "Sections",
		icon: "storage",
		items: [
			{
				text: "Manage",
				url: id => `/event/${id}/sections`,
			},
		],
		hideForStates: ["TO_SETUP"],
	},
	{
		text: "Maps",
		icon: "map",
		items: [
			{
				text: "Map set up",
				url: id => `/event/${id}/maps`,
			},
		],
		hideForStates: ["TO_SETUP"],
	},
];
