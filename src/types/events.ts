export type eventStatus = "TO_SETUP" | "PUBLISHED" | "READY" | "INACTIVE";
export type currentEventStatus = "NEUTRAL" | "LOADING" | "SUCCESS" | "ERROR";

export interface event {
	idEvent: string;
	name: string;
	mnemonic: string;
	startDate: string;
	endDate: string;
	creationDate: string;
	status: eventStatus;
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
	idFeedVersion?: string; // optionall for full data
	attendeeVersion?: string;
	categoryVersion?: string;
	exhibitorVersion?: string;
	facultyVersion?: string;
	scheduleVersion?: string;
	venueVersion?: string;
	lastUpdated?: string;
}

export interface eventBanner {
	idResource: string;
	type: number;
	cloudStorageLocation: string;
	redirectUrl: string;
	status: number;
	height: number;
	width: number;
	creationDate: string; // Can be improved for date parsing
	modificationDate: string; // Can be improved for date parsing
	idEvent: string;
}
