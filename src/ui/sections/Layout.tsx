import { Box, Container, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { Header } from "../common/Header";
import { Sidebar } from "./Sidebar";
import { useAppSelector } from "../../hooks/reduxHooks";
import { sideBarSelector } from "../../redux/slicers/appSlicer";
import { useInternalAuth } from "../../hooks/useInternalAuth";
interface props {
	children: JSX.Element;
}

const Separator = styled("div")({
	width: 240,
});

export const Layout = (props: props): JSX.Element => {
	const { children } = props;
	const isSidebarVisible = useAppSelector(sideBarSelector);
	const match = useMediaQuery("(min-width:600px)");

	useInternalAuth();

	if (match) {
		return (
			<>
				<Header />
				<Sidebar />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					{isSidebarVisible ? <Separator /> : null}
					<Box
						sx={{
							display: "flex",
							flexGrow: 1,
							p: 4,
						}}
					>
						{children}
					</Box>
				</Box>
			</>
		);
	}

	return (
		<Container>
			<Header />
			<Sidebar />
			<Box>{children}</Box>
		</Container>
	);
};
