import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { useGetConfigs } from "../../hooks/useGetConfig";
import { AbstractTable } from "../components/AbstractTable";
import { type config } from "../../types/configTypes";
import { configTableStructure } from "../../constants/tableConstants";
import { withInternalSession } from "../../HOCs/withInternalSession";

export const ConfigPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetConfigs();

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
		<AbstractTable<config>
			cols={configTableStructure}
			rows={data}
			limit={limit}
			page={page}
			total={totalCount}
			onChangePagination={onChangePagination}
		/>
	);
});
