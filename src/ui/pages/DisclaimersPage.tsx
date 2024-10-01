import { Box, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { AbstractTable } from "../components/AbstractTable";
import type { disclaimer } from "../../types/disclaimerTypes";
import { useGetDisclaimers } from "../../hooks/useGetDisclaimers";
import { disclaimerTableStructure } from "../../constants/tableConstants";
import { PageToolbar } from "../components/PageToolbar";

export const DisclaimersPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetDisclaimers();

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

	return (
		<Paper
			sx={{ minHeight: 400, width: "100%", padding: 24 / 8 }}
			elevation={3}
		>
			<PageToolbar
				title="Disclaimers"
				onAdd={() => {
					console.log("adding");
				}}
			/>
			<AbstractTable<disclaimer>
				cols={disclaimerTableStructure}
				rows={data}
				limit={limit}
				page={page}
				total={totalCount}
				onChangePagination={onChangePagination}
			/>
		</Paper>
	);
});
