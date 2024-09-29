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
