import { Switch } from "@mui/material";
import React, { useState } from "react";

interface props {
	initialValue: boolean;
	onChange: (checked: boolean) => void;
}

export const UncontrolledSwitchField = (props: props): JSX.Element => {
	const { initialValue, onChange: externalOnChange } = props;

	const [value, setValue] = useState<boolean>(initialValue);

	return (
		<Switch
			onChange={(event, checked) => {
				setValue(checked);
				externalOnChange(checked);
			}}
			checked={value}
		/>
	);
};
