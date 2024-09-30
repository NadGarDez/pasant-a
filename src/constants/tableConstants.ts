import moment, { type MomentInput } from "moment";

export const DATE_FORMAT = "L [at] LTS";
export interface keyValueInterface {
	key: string;
	label: string;
	cellFormatter?: (value: any) => string;
}

export const eventsTableStructure: keyValueInterface[] = [
	{
		key: "name",
		label: "Event Name",
	},
	{
		key: "mnemonic",
		label: "Mnemonic",
	},
	{
		key: "status",
		label: "Status",
	},
	{
		key: "type",
		label: "Type",
		cellFormatter: value => (String(value) === "0" ? "Normal" : "Parent"),
	},
	{
		key: "startDate",
		label: "Start Date",
		cellFormatter: value => moment(value as MomentInput).format(DATE_FORMAT),
	},
	{
		key: "endDate",
		label: "End Date",
		cellFormatter: value => moment(value as MomentInput).format(DATE_FORMAT),
	},
];

export const configTableStructure: keyValueInterface[] = [
	{
		key: "idConfig",
		label: "id",
	},
	{
		key: "configKey",
		label: "Key",
	},
	{
		key: "configValue",
		label: "Value",
	},
];

export const disclaimerTableStructure: keyValueInterface[] = [
	{
		key: "idDisclaimer",
		label: "id",
	},

	{
		key: "title",
		label: "Title",
	},
	{
		key: "cloudStorageLocation",
		label: "Url",
	},
	{
		key: "status",
		label: "Status",
		cellFormatter: value => (value === 1 ? "Active" : "Inactive"),
	},
];

export const groupsTableStructure: keyValueInterface[] = [
	{
		key: "idProfile",
		label: "idProfile",
	},
	{
		key: "name",
		label: "Name",
	},
	{
		key: "oktaId",
		label: "oktaId",
	},
	{
		key: "role",
		label: "Role",
	},
];

export const versionsTableStructure: keyValueInterface[] = [
	{
		key: "idVersion",
		label: "id",
	},
	{
		key: "name",
		label: "Name",
	},

	{
		key: "versionNumber",
		label: "Version Number",
	},

	{
		key: "status",
		label: "Status Name",
	},
];
