import React from "react";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import { Box, TextField } from "@mui/material";

interface props<T> {
	fields: fieldMetadaInteface[];
	initialValue: T;
	scheme: object;
	onSubmit: () => void;
}

export const AbstractForm = <T extends object>(
	props: props<T>,
): JSX.Element => {
	const { fields } = props;
	return (
		<Box
			flex={1}
			sx={{
				padding: "16px",
				widows: "100%",
			}}
		>
			{fields.map(item => (
				<TextField key={`field_${item.name}`} fullWidth />
			))}
		</Box>
	);
};
