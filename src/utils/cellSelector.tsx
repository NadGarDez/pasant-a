import moment, { type MomentInput } from "moment";

import React from "react";

const DATE_FORMAT = "L [at] LTS";

const MAPS_TYPE = [
	{
		value: 0,
		label: "Map area",
	},
	{
		value: 1,
		label: "Level Image",
	},
	{
		value: 2,
		label: "Web View Map",
	},
];

export const cellSelector: Record<
	string,
	(value: any) => JSX.Element | string
> = {
	date: value => moment(value as MomentInput).format(DATE_FORMAT),
	status: value => (value === 1 ? "Active" : "Inactive"),
	maps: value => {
		const type = MAPS_TYPE.find(current => current.value === value);
		return type?.label ?? value;
	},
	type: value => (String(value) === "0" ? "Normal" : "Parent"),
	image: value => (
		<img
			src={value as string}
			style={{
				width: 200,
				maxHeight: 200,
			}}
		/>
	),
};
