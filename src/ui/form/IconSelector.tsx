import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { iconConstant } from "../../constants/icons";

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

	return (
		<Box flex={1} mb={2}>
			{/* <FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">{label}</InputLabel>
				<Select
					value={value}
					label={label}
					onChange={event => {
                        setValue(event.target.value);
						onChange(event.target.value);
					}}
				>
					{iconConstant.map((item, index) => {
						const [name] = item.split("_");
						return (
							<MenuItem key={`select_item${item}_${index}`} value={item}>
								{name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl> */}

			<Autocomplete
				disablePortal
				options={iconConstant}
				fullWidth
				value={value}
				onChange={(event: any, newValue: string | null) => {
					setValue(newValue ?? "");
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				renderInput={params => <TextField {...params} label={label} />}
			/>
		</Box>
	);
};
