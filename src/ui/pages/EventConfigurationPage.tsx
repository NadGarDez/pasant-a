import React from "react";
import { AbstractForm } from "../components/AbstractForm";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import * as Yup from "yup";

const formStructure: fieldMetadaInteface[] = [
	{
		name: "test",
		label: "text",
		type: "string",
	},
];

const schema = Yup.object({
	test: Yup.string()
		.max(15, "Must be 15 characters or less")
		.required("Required"),
});

type formType = Yup.InferType<typeof schema>;

const initialValue: formType = {
	test: "",
};

export const EventConfigurationPage = (): JSX.Element => {
	return (
		<AbstractForm<formType>
			fields={formStructure}
			onSubmit={() => {
				console.log("submit");
			}}
			initialValue={initialValue}
			scheme={schema}
		/>
	);
};
