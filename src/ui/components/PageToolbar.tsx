// @flow
import { Add, Queue } from "@mui/icons-material";
import { Box, Fab, Toolbar, Typography } from "@mui/material";
import React from "react";

interface props {
	title?: string;
	onAdd: () => void;
	onQueue?: () => void;
}

export const PageToolbar = ({ title, onAdd, onQueue }: props): JSX.Element => (
	<Toolbar
		sx={{
			padding: 0,
		}}
	>
		<Box
			flexDirection="row"
			justifyContent="space-between"
			sx={{ width: "100%" }}
		>
			<Box display="flex" alignItems="center">
				<Fab size="small" color="primary" aria-label="Add" onClick={onAdd}>
					<Add />
				</Fab>
				{onQueue !== undefined ? (
					<Fab
						id="QueueButton"
						size="small"
						color="primary"
						aria-label="Queue"
						onClick={onQueue}
						sx={{
							marginLeft: 2,
						}}
					>
						<Queue />
					</Fab>
				) : null}
				{title !== undefined ? (
					<Typography variant="h6" id="tableTitle" ml={20 / 8}>
						{title}
					</Typography>
				) : null}
			</Box>
		</Box>
	</Toolbar>
);
