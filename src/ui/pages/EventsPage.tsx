import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { useGetEvents } from "../../hooks/useGetEvents";
import { eventsTableStructure } from "../../constants/tableConstants";
import { type event } from "../../types/events";
import { AbstractTable } from "../components/AbstractTable";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PageToolbar } from "../components/PageToolbar";
import {
	activeEventSelector,
	clearActiveEventAction,
	initializeActiveEventItemAction,
} from "../../redux/slicers/eventsSlice";

export const EventsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetEvents();
	const currentEvents = useAppSelector(activeEventSelector);
	const history = useHistory();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(clearActiveEventAction());
	}, [currentEvents]);

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
		});
	};

	const handleClick = (item: event): void => {
		dispatch(initializeActiveEventItemAction(item));
		history.push(`event/${item.idEvent}/overview`);
	};

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

	return (
		<Paper
			sx={{ minHeight: 400, width: "100%", padding: 24 / 8 }}
			elevation={3}
		>
			<PageToolbar
				title="Events"
				onAdd={() => {
					console.log("adding");
				}}
			/>
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
		</Paper>
	);
});
