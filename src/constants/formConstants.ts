import { type groupOfFields } from "../types/fomTypes";
import * as Yup from "yup";

// start event configuration form constants

export const eventConfigurationFieldStructure: groupOfFields[] = [
	{
		name: "Look and Feel Configuration",
		fields: [
			{
				name: "primaryColor",
				label: "Primary Color",
				type: "color",
			},
			{
				name: "secondaryColor",
				label: "Secondary Color",
				type: "color",
			},
			{
				name: "extraColor",
				label: "Extra Color",
				type: "color",
			},
		],
	},
	{
		name: "Colors for V2",
		fields: [
			{
				name: "primaryColorV2",
				label: "Primary Color",
				type: "color",
			},
			{
				name: "secondaryColorV2",
				label: "Secondary Color",
				type: "color",
			},
			{
				name: "extraColorV2",
				label: "Extra Color",
				type: "color",
			},
		],
	},
	{
		name: "Icons",
		fields: [
			{
				name: "favoriteIcon",
				label: "Favorite Icon",
				type: "text",
			},
			{
				name: "iconLibrary",
				label: "Icon Library",
				type: "text",
			},
		],
	},
	{
		name: "Home Feed Poll Banner Configuration",
		fields: [
			{
				name: "pollBannerText",
				label: "Banner Text",
				type: "text",
			},
			{
				name: "pollBannerColor",
				label: "Banner Background Color",
				type: "color",
			},
			{
				name: "pollBannerUrl",
				label: "Banner Image (width:250px / height:250px)",
				type: "file",
				additionalProps: {
					requiredWidth: 250,
					requiredHeight: 250,
					selectItems: [],
				},
			},
		],
	},
	{
		name: "Home Feed Sessions Configuration",
		fields: [
			{
				name: "nowSessionLimit",
				label: "Number of NOW Sessions in Home Feed",
				type: "number",
			},
			{
				name: "sessionLimit",
				label: "Number of NEXT Sessions in Home Feed",
				type: "number",
			},
			{
				name: "level",
				label: "Show Level events in Home Feed from level",
				type: "number",
			},
			{
				name: "pollType",
				label: "Poll Type",
				type: "text",
			},
		],
	},
	{
		name: "Others",
		fields: [
			{
				name: "activeChat",
				label: "Activate Chat for this event",
				type: "boolean",
			},
			{
				name: "activeChatV2",
				label: "Activate Chat V2 for this event",
				type: "boolean",
			},
			{
				name: "brightCoveAccountId",
				label: "Brightcove Account Id",
				type: "text",
			},
			{
				name: "eventHomeNewsURL",
				label: "Event Home News Url",
				type: "text",
			},
		],
	},
];

export const eventConfigurationFormSchema = Yup.object({
	primaryColor: Yup.string(),
	secondaryColor: Yup.string(),
	extraColor: Yup.string(),
});

// end of event configuration form constants

export const eventFundamentalFieldStructure: groupOfFields[] = [
	{
		fields: [
			{
				name: "name",
				label: "Event name",
				type: "text",
			},
			{
				name: "crfName",
				label: "CRF name",
				type: "text",
			},
			{
				name: "mnemonic",
				label: "Mnemonic",
				type: "text",
			},
			{
				name: "startDate",
				label: "Start Date",
				type: "datetime",
			},
			{
				name: "endDate",
				label: "End Date",
				type: "datetime",
			},
			{
				name: "hay",
				label: "End Date",
				type: "icon",
			},
		],
	},
	{
		name: "Multi-event configuration",
		fields: [
			{
				name: "comingSoon",
				label:
					"List your guide as 'Coming Soon'. Event guides listed as 'Coming Soon' appear in the Eventbase app but cannot be downloaded while this option is selected",
				type: "boolean",
			},
			{
				name: "comingSoonFeature",
				label: "Promote this event in the 'Featured' section of the app",
				type: "boolean",
			},
		],
	},
	{
		fields: [
			{
				name: "portraitBannerURL",
				label: "Banner Image",
				type: "file",
				additionalProps: {
					requiredWidth: 250,
					requiredHeight: 250,
					selectItems: [],
				},
			},
			{
				name: "portraitBannerURLV2",
				label: "Banner Image V2",
				type: "file",
				additionalProps: {
					requiredWidth: 250,
					requiredHeight: 250,
					selectItems: [],
				},
			},
		],
	},
	{
		name: "Location",
		fields: [
			{
				name: "address",
				label: "Address",
				type: "text",
			},
			{
				name: "city",
				label: "City",
				type: "text",
			},
			{
				name: "state",
				label: "State",
				type: "text",
			},
			{
				name: "country",
				label: "Country",
				type: "text",
			},
			{
				name: "timezone",
				label: "Timezone",
				type: "text",
			},
		],
	},
	{
		name: "Data feeds",
		fields: [
			{
				name: "schedule",
				label: "Schedule Endpoint",
				type: "text",
			},
			{
				name: "faculty",
				label: "Faculty Endpoint",
				type: "text",
			},
			{
				name: "category",
				label: "Category Endpoint",
				type: "text",
			},
			{
				name: "venues",
				label: "Venues Endpoint",
				type: "text",
			},
			{
				name: "exhibitors",
				label: "Exhibitors Endpoint",
				type: "text",
			},
			{
				name: "attendee",
				label: "Attendee Endpoint",
				type: "text",
			},
		],
	},
];

export const eventFundamentalsFormSchema = Yup.object({
	name: Yup.string(),
	crfName: Yup.string(),
});

export const advertisementForm: groupOfFields[] = [
	{
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
			},
			{
				name: "redirectUrl",
				label: "On tap, go to",
				type: "text",
			},
			{
				name: "cloudStorageLocation",
				label: "Banner Image",
				type: "file",
			},
		],
	},
];

export const advertisementFormSchema = Yup.object({
	title: Yup.string().required(),
});

export const sectionFormFieldStructure: groupOfFields[] = [
	{
		fields: [
			{
				name: "name",
				label: "Name",
				type: "text",
			},
			{
				name: "authenticated",
				label: "Need auth",
				type: "boolean",
			},
			{
				name: "sideMenu",
				label: "Enabled",
				type: "boolean",
			},
			{
				name: "homeScreen",
				label: "Show In Tab Bar",
				type: "boolean",
			},
		],
	},
	{
		fields: [
			{
				name: "templateId",
				label: "Template",
				type: "text",
			},
		],
	},
];

export const videoStreamFormFieldStructure: groupOfFields[] = [
	{
		fields: [
			// {
			// 	name: "type",
			// 	label: "Type",
			// 	type: "text",
			// },
			{
				name: "name",
				label: "Channel Name",
				type: "text",
			},
			{
				name: "url",
				label: "Channel Url",
				type: "text",
			},
		],
	},
	{
		name: "Filters",
		fields: [
			{
				name: "category",
				label: "Channel Name",
				type: "text",
			},
			{
				name: "sessionTitle",
				label: "Session Title",
				type: "text",
			},
			{
				name: "venue",
				label: "Venue",
				type: "text",
			},
		],
	},
	{
		fields: [
			{
				name: "status",
				label: "Active",
				type: "boolean",
			},
		],
	},
];

export const videoStreamsFormSchema = Yup.object({
	name: Yup.string().required(),
});

export const mapsFormFieldStructure: groupOfFields[] = [
	{
		fields: [
			{
				name: "name",
				label: "Map Name",
				type: "text",
			},

			{
				name: "addressField",
				label: "Address",
				type: "text",
			},
		],
	},
];

export const mapsFormSchema = Yup.object({
	name: Yup.string().required(),
});

export const generalEventFormStructure: groupOfFields[] = [
	{
		fields: [
			{
				name: "name",
				label: "Event Name",
				type: "text",
			},
			{
				name: "mnemonic",
				label: "Mnemonic Name",
				type: "text",
			},
			{
				name: "startDate",
				label: "Start Date",
				type: "datetime",
			},
			{
				name: "endDate",
				label: "End Date",
				type: "datetime",
			},
			{
				name: "timezone",
				label: "Timezone",
				type: "text",
			},
			{
				name: "type",
				label: "Type",
				type: "select",
				additionalProps: {
					requiredWidth: 250,
					requiredHeight: 250,
					selectItems: [
						{
							value: "0",
							label: "Normal",
						},
						{
							value: "1",
							label: "Parent",
						},
					],
				},
			},
		],
	},
];

export const generalEventFormSchema = Yup.object({
	name: Yup.string().required(),
	mnemonic: Yup.string().required(),
	startDate: Yup.date().required(),
	endDate: Yup.date().required(),
	timezone: Yup.string().required(),
	type: Yup.string().required(),
});

export const configFormStructure: groupOfFields[] = [
	{
		fields: [
			// {
			// 	name: "idConfig",
			// 	label: "id",
			// 	type: "text",
			// },
			{
				name: "configKey",
				label: "Key Name",
				type: "text",
			},
			{
				name: "configValue",
				label: "Value",
				type: "text",
			},
		],
	},
];

export const configFormSchema = Yup.object({
	// idConfig: Yup.string().required(),
	configKey: Yup.string().required(),
	configValue: Yup.string().required(),
});

export const disclaimersFormStructure: groupOfFields[] = [
	{
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
			},

			{
				name: "cloudStorageLocation",
				label: "Image URL",
				type: "text",
			},

			{
				name: "redirectUrl",
				label: "Redirect URL",
				type: "text",
			},

			{
				name: "status",
				label: "Active Status",
				type: "boolean",
			},
		],
	},
];

export const disclaimerFormSchema = Yup.object({
	// idConfig: Yup.string().required(),
	title: Yup.string().required(),
	cloudStorageLocation: Yup.string(),
	redirectUrl: Yup.string(),
	status: Yup.bool().required(),
});

export const versionsFormStructure: groupOfFields[] = [
	{
		fields: [
			{
				name: "name",
				label: "App Version Name",
				type: "text",
			},
			{
				name: "versionNumber",
				label: "Version Number Name",
				type: "text",
			},
			{
				name: "status",
				label: "Force Update",
				type: "boolean",
			},
		],
	},
];

export const versionsFormSchema = Yup.object({
	name: Yup.string().required(),
	versionNumber: Yup.string().required(),
	status: Yup.bool().required(),
});

export const groupsFormStructure: groupOfFields[] = [
	{
		fields: [
			{
				name: "name",
				label: "Name",
				type: "text",
			},
			{
				name: "role",
				label: "Role Name",
				type: "text",
			},
		],
	},
];

export const groupsFormSchema = Yup.object({
	name: Yup.string().required(),
	role: Yup.bool().required(),
});
