import {
	Collapse,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import React, { useState } from "react";
import { type drawerItem } from "../../types/drawer";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { currentEventSelector } from "../../redux/slicers/eventsSlice";

export const DrawerItem = (props: drawerItem): JSX.Element => {
	const { text, icon, items } = props;
	const [active, setActive] = useState<boolean>(false);
	const currentEvent = useAppSelector(currentEventSelector);
	const navigate = useHistory();

	const toggleColapse = (): void => {
		setActive(!active);
	};

	const onClickSubItem = (url: string): void => {
		navigate.push(url);
	};

	return (
		<>
			<ListItem onClick={toggleColapse}>
				<ListItemButton>
					<ListItemIcon>
						<Icon sx={{ color: "#4f96b9" }}>{icon}</Icon>
					</ListItemIcon>
					<ListItemText>
						<Typography
							variant="body2"
							noWrap
							color="secondary"
							sx={{
								opacity: active ? 1 : 0.5,
							}}
						>
							{text}
						</Typography>
					</ListItemText>
					<Icon
						color="secondary"
						sx={{
							opacity: active ? 1 : 0.5,
						}}
					>
						{active ? "expand_more" : "chevron_right"}
					</Icon>
				</ListItemButton>
			</ListItem>
			<Collapse
				in={active}
				timeout="auto"
				sx={{
					bgcolor: "#151e25",
				}}
			>
				<List component="div">
					{items.map((child, index) => (
						<ListItem
							key={`drawer-child-${index}`}
							onClick={() => {
								if (currentEvent !== null) {
									onClickSubItem(child.url(currentEvent.id));
								}
							}}
						>
							<ListItemButton>
								<Typography variant="body2" color="secondary" noWrap>
									{child.text}
								</Typography>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Collapse>
		</>
	);
};
