import React from "react";
import { AbstractForm } from "../components/AbstractForm";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import * as Yup from "yup";

const formStructure: fieldMetadaInteface[] = [
	{
		name: "test",
		label: "text",
		type: "text",
	},
	{
		name: "test2",
		label: "number",
		type: "number",
	},
];

const schema = Yup.object({
	test: Yup.string()
		.max(15, "Must be 15 characters or less")
		.required("Required"),
	test2: Yup.number(),
});

type formType = Yup.InferType<typeof schema>;

const initialValue: formType = {
	test: "Hey jud",
	test2: 1,
};

export const EventConfigurationPage = (): JSX.Element => {
	return (
		<AbstractForm<formType>
			fields={formStructure}
			onSubmit={(values: any) => {
				console.log(values);
			}}
			initialValues={initialValue}
			scheme={schema}
		/>
	);
};
