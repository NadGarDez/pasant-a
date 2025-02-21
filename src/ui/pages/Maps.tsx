import React, { useEffect } from "react";
import { BodyTab } from "../sections/BodyTab";
import { mapTabs } from "../../constants/uiStaticItems";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { useParams } from "react-router-dom";
import { useEvent } from "../../hooks/useEvent";
import { Box, LinearProgress, Typography } from "@mui/material";
import { Error } from "@mui/icons-material";

export const Maps = withInternalSession((): JSX.Element => {
	const { id } = useParams<{ id: string }>();

	const {
		get,
		activeItem: { error, data, status },
	} = useEvent(id);

	useEffect(() => {
		if (data === null) {
			get();
		}
	}, [data]);

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

	if (status === "ERROR") {
		return (
			<Box
				sx={{
					width: "80%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					margin: "0 auto",
				}}
			>
				<Error color="error" sx={{ marginRight: 1 }} />
				<Typography>{error ?? ""}</Typography>
			</Box>
		);
	}

	return <BodyTab tabs={mapTabs} />;
});
