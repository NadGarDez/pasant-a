import React from "react";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import { Box, TextField } from "@mui/material";

type props = fieldMetadaInteface & {
	onChange: (value: any) => void;
	value: any;
};

export const FieldSelector = (props: props): JSX.Element => {
	const { type } = props;

	switch (type) {
		case "text": {
			return (
				<Box flex={1} mb={2}>
					<TextField fullWidth {...props} />
				</Box>
			);
		}

		case "number": {
			return (
				<Box flex={1} mb={2}>
					<TextField fullWidth {...props} />
				</Box>
			);
		}

		case "boolean": {
			return <></>;
		}

		case "color": {
			return <></>;
		}
		default: {
			return <></>;
		}
	}
};
