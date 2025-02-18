// @flow
import { Add, Queue } from "@mui/icons-material";
import { Box, Fab, Toolbar, Typography } from "@mui/material";
import React from "react";

interface props {
	title?: string;
	onAdd?: () => void;
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
				{onAdd !== undefined ? (
					<Fab
						size="small"
						color="primary"
						aria-label="Add"
						onClick={onAdd}
						sx={{ marginRight: 20 / 8 }}
					>
						<Add />
					</Fab>
				) : null}
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
					<Typography variant="h6" id="tableTitle">
						{title}
					</Typography>
				) : null}
			</Box>
		</Box>
	</Toolbar>
);
