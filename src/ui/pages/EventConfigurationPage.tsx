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
		type: "boolean",
	},
	{
		name: "test3",
		label: "Switch item",
		type: "object",
		subItems: [
			{
				name: "test3.test1",
				label: "sub item number",
				type: "number",
			},
			{
				name: "test3.test2",
				label: "sub item string",
				type: "text",
			},
		],
	},
];

const schema = Yup.object({
	test: Yup.string()
		.max(15, "Must be 15 characters or less")
		.required("Required"),
	test2: Yup.boolean(),
	test3: Yup.object({
		test1: Yup.number(),
		test2: Yup.string(),
	}),
});

type formType = Yup.InferType<typeof schema>;

const initialValue: formType = {
	test: "Hey jud",
	test2: true,
	test3: {
		test1: 1,
		test2: "anc",
	},
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
