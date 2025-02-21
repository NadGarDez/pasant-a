import {
	type LanguageType,
	type CRDMenuItem,
	type drawerItem,
	type tab,
} from "../types/uiTypes";

export const drawerItems: drawerItem[] = [
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
		text: "Manage content",
		icon: "perm_media",
		items: [
			{
				text: "Advertisement",
				url: id => `/event/${id}/advertisements`,
			},
			// {
			// 	text: "Topics",
			// 	url: id => `/event/${id}/topics`,
			// },
			{
				text: "Video Streams",
				url: id => `/event/${id}/livestreams`,
			},
			// {
			// 	text: "Static Polls",
			// 	url: id => `/event/${id}/polls`,
			// },
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

export const crdMenuItems: CRDMenuItem[] = [
	{
		key: "configs",
		label: "Config",
		to: "/configs",
	},
	{
		key: "disclaimers",
		label: "Disclaimers",
		to: "/disclaimers",
	},
	{
		key: "events",
		label: "Event List",
		to: "/events",
	},
	{
		key: "groups",
		label: "Group List",
		to: "/groups",
	},
	{
		key: "versions",
		label: "Version List",
		to: "/versions",
	},
];

export const language: LanguageType[] = [
	{
		key: "en",
		label: "EN",
		flag: "US",
	},
];

export const mapTabs: tab[] = [
	{
		label: "Maps",
		icon: "remove_from_queue",
		name: "mapsTable",
	},
	{
		label: "Sort Maps",
		icon: "format_list_numbered",
		name: "sortMaps",
	},
];

export const sectionTabs: tab[] = [
	{
		label: "Sections",
		icon: "remove_from_queue",
		name: "sectionsTable",
	},
	{
		label: "Sort Sections",
		icon: "format_list_numbered",
		name: "sortSections",
	},
];

export const videoTabs: tab[] = [
	{
		label: "Video Streams",
		icon: "remove_from_queue",
		name: "videosTable",
	},
	{
		label: "Sort Video Streams",
		icon: "format_list_numbered",
		name: "sortVideos",
	},
];

export const bannerTabs: tab[] = [
	{
		label: "Banners",
		icon: "remove_from_queue",
		name: "bannersTable",
	},
	{
		label: "Sort Banners",
		icon: "format_list_numbered",
		name: "sortBanners",
	},
];
