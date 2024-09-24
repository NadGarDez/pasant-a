import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { crdMenuItems } from "../../constants/uiStaticItems";
import { Link, useHistory } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";

export const CRDNavBarMenu = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};
	const navigate = useHistory();
	const handleClose = (url: string): void => {
		setAnchorEl(null);
		navigate.push(url);
	};

	const open: boolean = Boolean(anchorEl);

	const getRouteName = (): string => {
		const path = window.location.pathname;
		const result = crdMenuItems.find(item => item.to === path);
		return result?.label ?? "";
	};

	return (
		<div>
			<Button onClick={handleClick}>
				{getRouteName()}
				<MoreVert />
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{crdMenuItems.map(item => (
					<MenuItem
						key={`crd_menu_${item.key}`}
						selected={item.to === window.location.pathname}
						LinkComponent={Link}
						onClick={() => {
							handleClose(item.to);
						}}
					>
						{item.label}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
