import React from "react";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import {
	Box,
	FormControlLabel,
	FormGroup,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import _ from "underscore";

type props = fieldMetadaInteface & {
	onChange: (name: string, value: any) => any;
	value: any;
};

const getSubItemKeyName = (name: string): string => {
	const splitName = name.split(".");
	return splitName[splitName.length - 1];
};

export const FieldSelector = (props: props): JSX.Element => {
	const { type, label, onChange, subItems = [], name, value } = props;

	switch (type) {
		case "text": {
			return (
				<Box flex={1} mb={2}>
					<TextField
						fullWidth
						{..._.omit(props, "onChange")}
						onChange={event => {
							onChange(name, event.target.value);
						}}
					/>
				</Box>
			);
		}

		case "number": {
			return (
				<Box flex={1} mb={2}>
					<TextField
						fullWidth
						{..._.omit(props, "onChange")}
						onChange={event => {
							onChange(name, event.target.value);
						}}
					/>
				</Box>
			);
		}

		case "object": {
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
					<Typography mb={2}>{label}</Typography>
					{subItems.map(item => (
						<FieldSelector
							key={`field_${name}_${item.name}`}
							value={value[getSubItemKeyName(item.name)]} // value can be undfined if the form has not values for that item
							onChange={onChange}
							{...item}
						/>
					))}
				</Box>
			);
		}

		case "array": {
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
					<Typography mb={2}>{label}</Typography>
					{subItems.map((item, index) => (
						<FieldSelector
							key={`field_${name}_${item.name}`}
							value={value[index]} // value can be undfined if the form has not values for that item
							onChange={onChange}
							{...item}
						/>
					))}
				</Box>
			);
		}

		case "boolean": {
			return (
				<Box
					flex={1}
					mb={2}
					sx={{
						border: "1px solid #ccc",
						borderRadius: "4px",
						padding: "16px",
						widows: "100%",
					}}
				>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									onChange={(event, checked) => {
										onChange(name, checked);
									}}
									checked={value}
								/>
							}
							label={label}
						/>
					</FormGroup>
				</Box>
			);
		}

		case "color": {
			return <></>;
		}
		default: {
			return <></>;
		}
	}
};
