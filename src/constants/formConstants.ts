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
				type: "text",
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
