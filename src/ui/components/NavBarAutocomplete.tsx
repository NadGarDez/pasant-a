import { MoreVert } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
	activeEventSelector,
	eventsSelector,
} from "../../redux/slicers/eventsSlice";
import {
	getEventIdFromEventObject,
	getOptionsFromEventData,
} from "../../utils/utils";
import { useHistory } from "react-router-dom";

export const NavBarAutocomplete = (): JSX.Element => {
	const { data = [] } = useAppSelector(eventsSelector);
	const { data: activeEventData } = useAppSelector(activeEventSelector);
	const history = useHistory();

	const options = getOptionsFromEventData(data);

	console.log(options[0], activeEventData);
	return (
		<>
			<Autocomplete
				disablePortal
				value={options.find(
					item => `${item.id}` === getEventIdFromEventObject(activeEventData),
				)}
				size="small"
				onChange={(event, value) => {
					history.push(`/event/${value?.id ?? 0}/overview`);
				}}
				options={options}
				sx={{ width: 100 }}
				renderInput={params => <TextField {...params} variant="standard" />}
			/>
			<MoreVert />
		</>
	);
};
