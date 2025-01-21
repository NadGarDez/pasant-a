import React, { useEffect, useState } from "react";
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
import { Alert, Box, Collapse } from "@mui/material";
import { useParams } from "react-router-dom";

type formType = Yup.InferType<typeof eventFundamentalsFormSchema>;

const initialValue: formType = {
	name: "123",
};

export const FundamentalPage = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

	const { refetch, reducerStatus, clear } =
		useLocalRequest(fudamentalPutRequest);
	const [open, setOpen] = useState(false);

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
					<Box mt={2}>
						<Collapse in={open} style={{ marginTop: 1 }}>
							{reducerStatus === "SUCCESSED" ? (
								<Alert severity="success" onClose={close}>
									This Alert uses a Button component for its action.
								</Alert>
							) : null}

							{reducerStatus === "ERROR" ? (
								<Alert severity="success" onClose={close}>
									This Alert uses a Button component for its action.
								</Alert>
							) : null}
						</Collapse>
					</Box>
				</>
			</Body>
		</>
	);
};
