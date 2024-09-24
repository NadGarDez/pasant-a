import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { language } from "../../constants/uiStaticItems";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Link } from "react-router-dom";
import { languageSelector, setLanguage } from "../../redux/slicers/appSlicer";
import { Language } from "@mui/icons-material";
import ReactCountryFlag from "react-country-flag";

export const LanguageMenu = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const selectedLanguage = useAppSelector(languageSelector);
	const handleClose = (): void => {
		setAnchorEl(null);
	};

	const open: boolean = Boolean(anchorEl);

	return (
		<div>
			<Button onClick={handleClick}>
				<Language />
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{language.map(item => (
					<MenuItem
						key={`lenguage_menu_${item.key}`}
						selected={item.key === selectedLanguage}
						LinkComponent={Link}
						onClick={() => {
							handleClose();
							dispatch(setLanguage(item.key));
						}}
					>
						{item.label}
						<ReactCountryFlag
							countryCode={item.flag}
							style={{ marginLeft: 4 }}
						/>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
