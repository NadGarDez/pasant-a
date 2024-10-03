import { Button } from "@mui/material";
import React from "react";

interface props {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}

export const LoginLogoutButton = (props: props): JSX.Element => {
	const { isAuthenticated, login, logout } = props;
	return (
		<>
			{isAuthenticated ? (
				<Button onClick={logout} color="inherit">
					logout
				</Button>
			) : (
				<Button onClick={login} color="inherit">
					login
				</Button>
			)}
		</>
	);
};
