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
	onDimiss?: () => void;
}

export const AbstractForm = <T extends object>(
	props: props<T>,
): JSX.Element => {
	const { fields, scheme, initialValues, onSubmit, onDimiss } = props;
	const { values, submitForm, setFieldValue, setFieldTouched } = useFormik({
		validationSchema: scheme,
		onSubmit,
		initialValues,
	});

	const handleChange = (name: string, value: any): any => {
		void setFieldValue(name, value);
		void setFieldTouched(name);
	};

	return (
		<Box
			flex={1}
			sx={{
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
				<Box
					display="flex"
					flex={1}
					pt={2}
					flexDirection="row"
					justifyContent="flex-end"
				>
					{onDimiss !== undefined ? (
						<Button
							variant="outlined"
							sx={{
								marginRight: 2,
							}}
							onClick={onDimiss}
						>
							Cancel
						</Button>
					) : null}
					<Button
						variant="contained"
						onClick={() => {
							void submitForm();
						}}
					>
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
};
