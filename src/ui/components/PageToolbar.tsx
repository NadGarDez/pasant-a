// @flow
import { Add } from "@mui/icons-material";
import { Box, Fab, Toolbar, Typography } from "@mui/material";
import React from "react";

interface props {
	title: string;
	onAdd: () => void;
}

export const PageToolbar = ({ title, onAdd }: props): JSX.Element => (
	<Toolbar>
		<Box
			flexDirection="row"
			justifyContent="space-between"
			sx={{ width: "100%" }}
		>
			<Box display="flex" alignItems="center">
				<Fab size="small" color="primary" aria-label="Add" onClick={onAdd}>
					<Add />
				</Fab>
				<Typography variant="h6" id="tableTitle" ml={20 / 8}>
					{title}
				</Typography>
			</Box>
		</Box>
	</Toolbar>
);
