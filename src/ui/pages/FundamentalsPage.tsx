import React, { useEffect } from "react";
import { AbstractForm } from "../components/AbstractForm";
import type * as Yup from "yup";
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

type formType = Yup.InferType<typeof eventFundamentalsFormSchema>;

const initialValue: formType = {
	name: "123",
};

export const FundamentalPage = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

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
		<>
			<Body>
				<>
					<AbstractForm
						loading={reducerStatus === "LOADING"}
						fields={eventFundamentalFieldStructure}
						onSubmit={onSubmit}
						onDimiss={close}
						initialValues={initialValue}
						scheme={eventFundamentalsFormSchema}
					/>
				</>
			</Body>
		</>
	);
};
