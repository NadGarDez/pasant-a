import { MoreVert } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const staticEvents = [
	{
		label: "TCT",
		id: 1,
	},
	{
		label: "CRD",
		id: 2,
	},
	{
		label: "ABC",
		id: 3,
	},
	{
		label: "EDF",
		id: 4,
	},
];

export const NavBarAutocomplete = (): JSX.Element => {
	return (
		<>
			<Autocomplete
				disablePortal
				size="small"
				defaultValue={staticEvents[0]}
				onChange={value => {
					console.log(value, "super");
				}}
				options={staticEvents}
				sx={{ width: 100 }}
				renderInput={params => <TextField {...params} variant="standard" />}
			/>
			<MoreVert />
		</>
	);
};
