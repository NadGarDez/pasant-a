import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { iconNames } from "./constants/icons";

interface props {
	label: string;
	initialValue: string;
	name: string;
	onChange: (value: string) => void;
}

export const IconSelector = (props: props): JSX.Element => {
	const { label, initialValue, onChange } = props;

	const [value, setValue] = useState<string>(initialValue);
	const [inputValue, setInputValue] = useState<string>(initialValue);

	useEffect(() => {
		onChange(value);
	}, [value]);

	const [fontItem, fontFamily] = useMemo(() => value.split("_"), [value]);

	return (
		<Box flex={1} mb={2}>
			<Autocomplete
				disablePortal
				options={iconNames}
				fullWidth
				value={value}
				onChange={(event: any, newValue: string | null) => {
					setValue(newValue ?? "");
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				renderInput={params => (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<TextField
							{...{
								...params,
								InputProps: {
									...params.InputProps,
									startAdornment: (
										<Icon name={fontItem} fontFamily={fontFamily} />
									),
								},
							}}
							label={label}
						/>
					</Box>
				)}
				// renderOption={(props, option, state, ownerState) => {
				// 	// eslint-disable-next-line react/prop-types
				// 	const { key, ...optionProps } = props;
				// 	return (
				// 		<Box
				// 			sx={{ display: "flex", alignItems: "center" }}
				// 			key={key}
				// 			component="li"
				// 			{...optionProps}
				// 		>
				// 			<Typography>{ownerState.getOptionLabel(option)}</Typography>
				// 			<Icon
				// 				name={option.split("_")[0]}
				// 				fontFamily={option.split("_")[0]}
				// 			/>
				// 		</Box>
				// 	);
				// }}
			/>
		</Box>
	);
};
