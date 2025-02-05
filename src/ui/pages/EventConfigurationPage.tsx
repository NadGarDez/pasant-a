import React, { useEffect } from "react";
import { AbstractForm } from "../components/AbstractForm";
import type * as Yup from "yup";
import {
	eventConfigurationFieldStructure,
	eventConfigurationFormSchema,
} from "../../constants/formConstants";
import { Body } from "../sections/Body";
import { fudamentalPutRequest } from "../../utils/apiRequest";
import { useLocalRequest } from "../../hooks/useLocalRequest";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useSnackbar } from "notistack";

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

	const { refetch, reducerStatus, clear } =
		useLocalRequest(fudamentalPutRequest);

	const { enqueueSnackbar } = useSnackbar();

	const onSubmit = (values: any): void => {
		void refetch({
			token,
			bodyObject: values,
			eventId: id,
		});
	};

	const close = (): void => {};

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
			</>
		</Body>
	);
};
