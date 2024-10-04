import React from "react";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { FieldSelector } from "../form/FieldSelector";

interface props<T> {
	fields: fieldMetadaInteface[];
	initialValues: T;
	scheme: object;
	onSubmit: (values: any) => void;
}

export const AbstractForm = <T extends object>(
	props: props<T>,
): JSX.Element => {
	const { fields, scheme, initialValues, onSubmit } = props;
	const { handleChange, values, submitForm } = useFormik({
		validationSchema: scheme,
		onSubmit,
		initialValues,
	});
	return (
		<Box
			flex={1}
			sx={{
				padding: "16px",
				widows: "100%",
			}}
		>
			<form>
				{fields.map(item => (
					<FieldSelector
						key={`field_${item.name}`}
						value={values[item.name as keyof T]}
						onChange={handleChange}
						{...item}
					/>
				))}
				<Button
					onClick={() => {
						void submitForm();
					}}
				>
					Submit
				</Button>
			</form>
		</Box>
	);
};
