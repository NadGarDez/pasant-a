import React from "react";
import { AbstractForm } from "../components/AbstractForm";
import type * as Yup from "yup";
import {
	eventConfigurationFieldStructure,
	eventConfigurationFormSchema,
} from "../../constants/formConstants";
import { useEventVerbs } from "../../hooks/useEventVerbs";
import { type event } from "../../types/events";
import { Body } from "../sections/Body";

type formType = Yup.InferType<typeof eventConfigurationFormSchema>;

const initialValue: formType = {
	// form with value from fetch
	primaryColor: "#ffffff",
	secondaryColor: "#000000",
	extraColor: "#ff00ff",
};

export const EventConfigurationPage = (): JSX.Element => {
	const { post, put } = useEventVerbs("2");

	const onSubmit = (values: any): void => {
		const a = true;
		if (a) {
			post(values as event);
		} else {
			put(values as event);
		}
	};

	return (
		<Body>
			<AbstractForm
				fields={eventConfigurationFieldStructure}
				onSubmit={onSubmit}
				onDimiss={close}
				initialValues={initialValue}
				scheme={eventConfigurationFormSchema}
			/>
		</Body>
	);
};
