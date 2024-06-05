import React from "react";

import { SignInWidget } from "../groupedComponents/SignInWidget";

export const LoginPage = (): JSX.Element => {
	return (
		<div>
			<SignInWidget
				onError={e => {
					console.log("super error", e);
				}}
				onSuccess={data => {
					console.log("success", data);
				}}
			/>
		</div>
	);
};
