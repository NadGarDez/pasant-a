import React, { useEffect, useState } from "react";
import { AbstractForm } from "../components/AbstractForm";
import type * as Yup from "yup";
import {
	eventConfigurationFieldStructure,
	eventConfigurationFormSchema,
} from "../../constants/formConstants";
import { Body } from "../sections/Body";
import { fudamentalPutRequest } from "../../utils/apiRequest";
import { Alert, Box, Collapse } from "@mui/material";
import { useLocalRequest } from "../../hooks/useLocalRequest";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";

type formType = Yup.InferType<typeof eventConfigurationFormSchema>;

const initialValue: formType = {
	// form with value from fetch
	primaryColor: "#ffffff",
	secondaryColor: "#000000",
	extraColor: "#ff00ff",
};

export const EventConfigurationPage = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);
	const [open, setOpen] = useState(false);

	const { refetch, reducerStatus, clear } =
		useLocalRequest(fudamentalPutRequest);

	const onSubmit = (values: any): void => {
		void refetch({
			token,
			bodyObject: values,
			eventId: id,
		});
	};

	const close = (): void => {
		setOpen(false);
	};

	useEffect(() => {
		if (reducerStatus === "SUCCESSED" || reducerStatus === "ERROR") {
			setTimeout(() => {
				clear();
			}, 5000);
		}
	}, [reducerStatus]);

	useEffect(() => {
		if (reducerStatus === "SUCCESSED" || reducerStatus === "ERROR") {
			setOpen(true);
		}
	}, [reducerStatus]);

	return (
		<Body>
			<>
				<AbstractForm
					loading={false}
					fields={eventConfigurationFieldStructure}
					onSubmit={onSubmit}
					onDimiss={close}
					initialValues={initialValue}
					scheme={eventConfigurationFormSchema}
				/>
				<Box mt={2}>
					<Collapse in={open} style={{ marginTop: 1 }}>
						{reducerStatus === "SUCCESSED" ? (
							<Alert severity="success" onClose={close}>
								Event Information saved successfully
							</Alert>
						) : null}

						{reducerStatus === "ERROR" ? (
							<Alert severity="error" onClose={close}>
								Error saving event information
							</Alert>
						) : null}
					</Collapse>
				</Box>
			</>
		</Body>
	);
};
