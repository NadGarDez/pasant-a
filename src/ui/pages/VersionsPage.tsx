import { Box, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { AbstractTable } from "../components/AbstractTable";
import { type version } from "../../types/versionTypes";
import { useGetVersions } from "../../hooks/useGetVersions";
import { versionsTableStructure } from "../../constants/tableConstants";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { PageToolbar } from "../components/PageToolbar";

export const VersionsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetVersions();

	console.log(status, data, totalCount);

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
			<PageToolbar
				title="Versions"
				onAdd={() => {
					console.log("adding");
				}}
			/>
			<AbstractTable<version>
				cols={versionsTableStructure}
				rows={data}
				limit={limit}
				page={page}
				total={totalCount}
				onChangePagination={onChangePagination}
			/>
		</Paper>
	);
});
