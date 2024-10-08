import React from "react";
import { type groupOfFields } from "../../types/fomTypes";
import { Box, Typography } from "@mui/material";
import { FieldSelector } from "./FieldSelector";

interface props {
	onChange: (name: string, value: any) => any;
	values: object;
}

export const FormGroup = (props: groupOfFields & props): JSX.Element => {
	const { name, fields, values, onChange } = props;
	return (
		<Box flex={1} mb={2}>
			{name !== undefined ? <Typography mb={2}>{name}</Typography> : null}
			{fields.map(item => (
				<FieldSelector
					key={`field_${item.name}`}
					value={values[item.name as keyof object]}
					onChange={onChange}
					{...item}
				/>
			))}
		</Box>
	);
};
