export type eventStatus = "TO_SETUP" | "PUBLISHED" | "READY" | "INACTIVE";
export type eventReducerStatus = "NEUTRAL" | "LOADING" | "SUCCESS" | "ERROR";

export interface event {
	idEvent: string;
	name: string;
	mnemonic: string;
	startDate: string;
	endDate: string;
	creationDate: string;
	status: "READY" | string; // Allows for future status types
	comingSoonUrl: string;
	mobileLoginPage: boolean;
	regenerate: boolean;
	address: string;
	city: string;
	state: string;
	country: string;
	timezone: string;
	schedule: string;
	faculty: string;
	category: string;
	venues: string;
	exhibitors: string;
	attendee: string;
	portraitBannerURL: string;
	bannerCycle: number;
	interstitialShowAfter: number;
	qt: string;
	primaryColor: string;
	secondaryColor: string;
	extraColor: string;
	favoriteIcon: string;
	iconLibrary: string;
	pollBannerText: string;
	pollBannerColor: string;
	eventVersion: string;
	dbVersion: string;
	sessionLimit: number;
	nowSessionLimit: number;
	level: number;
	pollType: number;
	type: number;
	activeChat: boolean;
	activeChatV2: boolean;
	disclaimerCycle: number;
	featured: boolean;
	comingSoon: boolean;
}
export interface eventsSliceInterface {
	status: eventReducerStatus;
	data: event[];
	totalCount: number;
	error: string | null;
	page: number;
	limit: number;
}
