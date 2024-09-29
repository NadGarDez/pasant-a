interface keyValueInterface {
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
	},
	{
		key: "startDate",
		label: "Start Date",
		cellFormatter: value => "",
	},
	{
		key: "endDate",
		label: "End Date",
		cellFormatter: value => "",
	},
];
