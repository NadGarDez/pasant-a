import { Box, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { AbstractTable } from "../components/AbstractTable";
import type { group } from "../../types/groupTypes";
import { useGetGroups } from "../../hooks/useGetGroups";
import { groupsTableStructure } from "../../constants/tableConstants";
import { withInternalSession } from "../../HOCs/withInternalSession";

export const GroupsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetGroups();

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
		});
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
			<AbstractTable<group>
				cols={groupsTableStructure}
				rows={data}
				limit={limit}
				page={page}
				total={totalCount}
				onChangePagination={onChangePagination}
			/>
		</Paper>
	);
});
