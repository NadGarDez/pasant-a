import React from "react";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import { Box, Typography } from "@mui/material";

export const ObjectField = (props: fieldMetadaInteface): JSX.Element => {
	const { label } = props;
	return (
		<Box
			flex={1}
			sx={{
				border: "1px solid #ccc",
				borderRadius: "4px",
				padding: "16px",
				widows: "100%",
			}}
		>
			<Typography>{label}</Typography>
		</Box>
	);
};
