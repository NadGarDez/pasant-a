import React, { useEffect } from "react";
import { AbstractForm } from "../components/AbstractForm";
import {
	eventFundamentalFieldStructure,
	eventFundamentalsFormSchema,
} from "../../constants/formConstants";
import { Body } from "../sections/Body";
import { useLocalRequest } from "../../hooks/useLocalRequest";
import { fudamentalPutRequest } from "../../utils/apiRequest";
import { useAppSelector } from "../../hooks/reduxHooks";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { activeEventSelector } from "../../redux/slicers/eventsSlice";
import { useEvent } from "../../hooks/useEvent";
import { Box, LinearProgress, Typography } from "@mui/material";
import { Error } from "@mui/icons-material";
import { withInternalSession } from "../../HOCs/withInternalSession";

export const FundamentalPage = withInternalSession((): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

	const { data } = useAppSelector(activeEventSelector);

	const { enqueueSnackbar } = useSnackbar();

	const { refetch, reducerStatus, clear } =
		useLocalRequest(fudamentalPutRequest);

	const onSubmit = (values: any): void => {
		void refetch({
			token,
			bodyObject: values,
			eventId: id,
		});
	};

	const {
		get,
		activeItem: { status, error },
	} = useEvent(id);

	useEffect(() => {
		if (reducerStatus === "SUCCESSED" || reducerStatus === "ERROR") {
			setTimeout(() => {
				clear();
			}, 5000);
		}
	}, [reducerStatus]);

	useEffect(() => {
		if (reducerStatus === "SUCCESSED") {
			enqueueSnackbar("Success", { variant: "success" });
		} else if (reducerStatus === "ERROR") {
			enqueueSnackbar("Error. Try again", { variant: "error" });
		}
	}, [reducerStatus]);

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

	return (
		<>
			<Body>
				<>
					<AbstractForm
						loading={reducerStatus === "LOADING"}
						fields={eventFundamentalFieldStructure}
						onSubmit={onSubmit}
						onDimiss={close}
						initialValues={data ?? {}}
						scheme={eventFundamentalsFormSchema}
					/>
				</>
			</Body>
		</>
	);
});
