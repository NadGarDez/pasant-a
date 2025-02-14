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
	sortOrder: number;
}

export interface eventMap {
	idEventMap: string;
	name: string;
	geoLocation?: string;
	imageUrl?: string;
	type: number;
	creationDate: string; // Consider using a Date object for better date handling
	idEvent: string;
	sortOrder: number;
	status: number;
}
export interface eventSection {
	idSection: string;
	name: string;
	jsonConfig: Record<string, any>;
	templateId: number;
	authenticated: boolean;
	sideMenu: boolean;
	homeScreen: boolean;
	type: number;
	sortOrder: number;
	idEvent: string;
	status: number;
}

export interface eventVideo {
	idLiveStream: string;
	name: string;
	url: string;
	imageUrl: string;
	category: string;
	sessionTitle?: string; // Optional property
	venue?: string; // Optional property
	type: number;
	status: number;
	idEvent: string;
	sortOrder: number;
}

export const randomEventconst: event = {
	idEvent: "123",
	name: "Awesome Event",
	mnemonic: "AE",
	startDate: "2023-11-20",
	endDate: "2023-11-22",
	creationDate: "2023-10-25",
	status: "INACTIVE",
	comingSoonUrl: "https://example.com/coming-soon",
	mobileLoginPage: true,
	regenerate: false,
	address: "123 Main Street",
	city: "Anytown",
	state: "CA",
	country: "USA",
	timezone: "America/Los_Angeles",
	schedule: "https://example.com/schedule",
	faculty: "Dr. Smith, Prof. Jones",
	category: "Technology, Science",
	venues: "Main Hall, Side Room",
	exhibitors: "Company A, Company B",
	attendee: "General Public",
	portraitBannerURL: "https://example.com/banner.jpg",
	bannerCycle: 5,
	interstitialShowAfter: 30,
	qt: "1234567890",
	primaryColor: "#007bff",
	secondaryColor: "#6c757d",
	extraColor: "#ffc107",
	favoriteIcon: "favorite",
	iconLibrary: "material-ui",
	pollBannerText: "Take our survey!",
	pollBannerColor: "#f0ad4e",
	eventVersion: "1.0.0",
	dbVersion: "2.0.1",
	sessionLimit: 100,
	nowSessionLimit: 50,
	level: 3,
	pollType: 1,
	type: 2,
	activeChat: true,
	activeChatV2: false,
	disclaimerCycle: 7,
	featured: true,
	comingSoon: false,
	// Optional fields
	idFeedVersion: "v1",
	attendeeVersion: "v2",
	categoryVersion: "v3",
	exhibitorVersion: "v4",
	facultyVersion: "v5",
	scheduleVersion: "v6",
	venueVersion: "v7",
	lastUpdated: "2023-10-25T12:34:56Z",
};
