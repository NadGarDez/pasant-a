import { Box, Icon, IconButton, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { useGetEvents } from "../../hooks/useGetEvents";
import { eventsTableStructure } from "../../constants/tableConstants";
import { type event } from "../../types/events";
import { AbstractTable } from "../components/AbstractTable";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
	clearCurrentEvent,
	currentEventSelector,
	setEvent,
} from "../../redux/slicers/currentEventSlice";
import { useSelector } from "react-redux";

export const EventsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetEvents();
	const currentEvents = useSelector(currentEventSelector);
	const history = useHistory();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(clearCurrentEvent());
	}, [currentEvents]);

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
		});
	};

	const handleClick = (item: event): void => {
		dispatch(setEvent(item));
		history.push(`event/${item.idEvent}`);
	};

	return (
		<AbstractTable<event>
			cols={eventsTableStructure}
			rows={data}
			limit={limit}
			page={page}
			total={totalCount}
			onChangePagination={onChangePagination}
			renderActions={item => (
				<IconButton
					color="default"
					aria-label="Info"
					onClick={() => {
						handleClick(item);
					}}
				>
					<Icon fontSize="inherit">error_outline</Icon>
				</IconButton>
			)}
		/>
	);
});
