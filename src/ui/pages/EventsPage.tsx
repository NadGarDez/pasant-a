import { Box, Icon, IconButton, LinearProgress } from "@mui/material";
import React from "react";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { useGetEvents } from "../../hooks/useGetEvents";
import { eventsTableStructure } from "../../constants/tableConstants";
import { type event } from "../../types/events";
import { Link } from "react-router-dom";
import { AbstractTable } from "../components/AbstractTable";

export const EventsPage = withInternalSession((): JSX.Element => {
	const { data, status } = useGetEvents();

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

	return (
		<AbstractTable<event>
			cols={eventsTableStructure}
			rows={data}
			renderActions={item => (
				<IconButton
					color="default"
					component={Link}
					to={`event/${item.idEvent}`}
					aria-label="Info"
				>
					<Icon fontSize="inherit">error_outline</Icon>
				</IconButton>
			)}
		/>
	);
});
