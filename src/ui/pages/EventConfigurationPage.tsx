import React, { useState } from "react";
import { AbstractForm } from "../components/AbstractForm";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import * as Yup from "yup";
import { ModalForm } from "../components/ModalForm";
import { Box } from "@mui/material";

const formStructure: fieldMetadaInteface[] = [
	{
		name: "test",
		label: "text",
		type: "text",
	},
	{
		name: "test2",
		label: "number",
		type: "color",
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
	test2: Yup.string(),
	test3: Yup.object({
		test1: Yup.number(),
		test2: Yup.string(),
	}),
});

type formType = Yup.InferType<typeof schema>;

const initialValue: formType = {
	test: "Hey jud",
	test2: "#000000",
	test3: {
		test1: 1,
		test2: "anc",
	},
};

export const EventConfigurationPage = (): JSX.Element => {
	const [open, setOpen] = useState<boolean>(true);
	const close = (): void => {
		setOpen(false);
	};

	return (
		<ModalForm open={open} handleClose={close} title="Title Form">
			<Box flex={1} pt={1}>
				<AbstractForm<formType>
					fields={formStructure}
					onSubmit={(values: any) => {
						console.log(values);
					}}
					onDimiss={close}
					initialValues={initialValue}
					scheme={schema}
				/>
			</Box>
		</ModalForm>
	);
};
