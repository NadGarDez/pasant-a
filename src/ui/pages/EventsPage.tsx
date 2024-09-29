import {
	Box,
	Icon,
	IconButton,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { useGetEvents } from "../../hooks/useGetEvents";
import { eventsTableStructure } from "../../constants/tableConstants";
import { type event } from "../../types/events";
import { Link } from "react-router-dom";
export const EventsPage = withInternalSession((): JSX.Element => {
	const { data, status } = useGetEvents();

	console.log(data, "super events");

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
			<Table>
				<TableHead>
					<TableRow>
						{eventsTableStructure.map((item, index) => (
							<TableCell key={`table_headier_item_${index}`}>
								{item.label}
							</TableCell>
						))}
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item, indexItem) => (
						<TableRow key={`row_${indexItem}_${item.idEvent}`}>
							{eventsTableStructure.map((subItem, subItemIndex) => (
								<TableCell key={`table_cell_item_${subItemIndex}`}>
									{item[subItem.key as keyof event]}
								</TableCell>
							))}
							<TableCell>
								<IconButton
									color="default"
									component={Link}
									to={`event/${item.idEvent}`}
									aria-label="Info"
								>
									<Icon fontSize="inherit">error_outline</Icon>
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
});
