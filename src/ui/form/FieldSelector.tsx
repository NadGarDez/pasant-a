import React from "react";
import { type fieldMetadaInteface } from "../../types/fomTypes";
import {
	Box,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import _ from "underscore";
import { MuiColorInput } from "mui-color-input";
import { DragAndDropField } from "../components/dnd";
import moment from "moment";

type props = fieldMetadaInteface & {
	onChange: (name: string, value: any) => void;
	value: any;
};

const getSubItemKeyName = (name: string): string => {
	const splitName = name.split(".");
	return splitName[splitName.length - 1];
};

export const FieldSelector = (props: props): JSX.Element => {
	const {
		type,
		label,
		onChange,
		subItems = [],
		name,
		value,
		additionalProps,
	} = props;

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
										onChange(name, checked ? 1 : 0);
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
			return (
				<Box flex={1} mb={2}>
					<MuiColorInput
						onChange={(value, colors) => {
							onChange(name, value);
						}}
						fullWidth
						value={value}
					/>
				</Box>
			);
		}

		case "file":
			return (
				<Box flex={1} mb={2}>
					<DragAndDropField
						name={name}
						onChange={onChange}
						label={label}
						initialValue={value}
						requiredHeight={additionalProps?.requiredHeight ?? 250}
						requiredWidth={additionalProps?.requiredWidth ?? 250}
					/>
				</Box>
			);

		case "select": {
			console.log("super value", value);
			return (
				<Box flex={1} mb={2}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">{label}</InputLabel>
						<Select
							value={value}
							label={label}
							onChange={event => {
								onChange(name, event.target.value);
							}}
						>
							{additionalProps?.selectItems.map((item, index) => (
								<MenuItem
									key={`select_item${name}_${index}`}
									value={item.value}
								>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			);
		}

		case "datetime": {
			const date = value !== undefined ? new Date(value as string) : new Date();

			return (
				<Box flex={1} mb={2}>
					<TextField
						type="datetime-local"
						fullWidth
						InputLabelProps={{ shrink: true }}
						onChange={event => {
							console.log(event.target.value);
							onChange(name, event.target.value);
						}}
						value={moment(date).format("YYYY-MM-DDTHH:mm")}
						label={label}
					/>
				</Box>
			);
		}

		default: {
			return <></>;
		}
	}
};
