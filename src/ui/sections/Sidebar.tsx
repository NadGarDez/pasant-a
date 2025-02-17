import React from "react";
import {
	Divider,
	Drawer,
	List,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import { DrawerItem } from "../components/DrawerItem";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { sideBarSelector, toogleSideBar } from "../../redux/slicers/appSlicer";
import { drawerItems } from "../../constants/uiStaticItems";

export const Sidebar = (): JSX.Element => {
	const theme = useTheme();
	const open = useAppSelector(sideBarSelector);
	const dispatch = useAppDispatch();

	const toggle = (): void => {
		dispatch(toogleSideBar());
	};

	return (
		<div>
			<Drawer
				open={open}
				variant="temporary"
				anchor="left"
				onClose={toggle}
				sx={{
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: 240,
						backgroundColor: theme.palette.primary.main,
					},
				}}
			>
				<Toolbar
					sx={{
						bgcolor: theme.palette.primary.main,
					}}
				>
					<Typography variant="h6" color="secondary" noWrap>
						CRD Events
					</Typography>
				</Toolbar>
				<Divider />
				<List
					sx={{
						bgcolor: theme.palette.primary.main,
					}}
				>
					{drawerItems.map((item, index) => (
						<DrawerItem key={index} {...item} />
					))}
				</List>
			</Drawer>
		</div>
	);
};
