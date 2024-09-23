import { Box, Container } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";
import { Sidebar } from "./Sidebar";

interface props {
	children: JSX.Element;
}

export const Layout = (props: props): JSX.Element => {
	const { children } = props;
	return (
		<Container>
			<Header />
			<Sidebar />
			<Box>{children}</Box>
		</Container>
	);
};
