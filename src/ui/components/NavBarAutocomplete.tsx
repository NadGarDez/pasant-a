import { MoreVert } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { eventsSelector } from "../../redux/slicers/eventsSlice";
import { type event } from "../../types/events";

interface option {
	label: string;
	id: number;
}

const getOptionsFromEventData = (data: event[]): option[] =>
	data.map(item => ({
		label: item.name,
		id: parseInt(item.idEvent),
	}));

export const NavBarAutocomplete = (): JSX.Element => {
	const { data = [] } = useAppSelector(eventsSelector);

	const options = getOptionsFromEventData(data);
	return (
		<>
			<Autocomplete
				disablePortal
				size="small"
				defaultValue={options[0]}
				onChange={value => {
					console.log(value, "super");
				}}
				options={options}
				sx={{ width: 100 }}
				renderInput={params => <TextField {...params} variant="standard" />}
			/>
			<MoreVert />
		</>
	);
};
