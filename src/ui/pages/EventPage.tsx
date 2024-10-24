import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControlLabel,
	LinearProgress,
	Switch,
	Table,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../hooks/useEvent";
import { withInternalSession } from "../../HOCs/withInternalSession";
import moment from "moment";
import {
	Error,
	GetApp,
	Loop,
	PowerSettingsNew,
	Redo,
} from "@mui/icons-material";

export const EventPage = withInternalSession((): JSX.Element => {
	const { id } = useParams<{ id: string }>();

	const {
		activeItem: { data, status, error },
		get,
	} = useEvent(id);

	useEffect(() => {
		get();
	}, [id]);

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

	if (status === "ERROR") {
		return (
			<Box
				sx={{
					width: "80%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					margin: "0 auto",
				}}
			>
				<Error color="error" sx={{ marginRight: 1 }} />
				<Typography>{error ?? ""}</Typography>
			</Box>
		);
	}

	return (
		<Box flex={1}>
			<Box
				sx={{
					width: "80%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					margin: "0 auto",
				}}
			>
				<FormControlLabel
					control={<Switch checked color="primary" />}
					label={<Typography>Show event in the app</Typography>}
					labelPlacement="start"
				/>
			</Box>

			<Card
				elevation={3}
				sx={{
					width: "80%",
					textAlign: "center",
					margin: "0 auto",
				}}
			>
				<CardHeader
					title={data?.name ?? ""}
					sx={{
						background: data?.status === "PUBLISHED" ? "#5DC24C" : "#FAD738",
					}}
				/>
				<CardContent>
					<Table>
						<TableRow>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								component="th"
								align="left"
							>
								<Typography>Status</Typography>
							</TableCell>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								align="right"
							>
								{data?.status ?? "-"}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								component="th"
								align="left"
							>
								<Typography>DB Version</Typography>
							</TableCell>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								align="right"
							>
								{data?.dbVersion ?? "-"}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								component="th"
								align="left"
							>
								<Typography>DB Size</Typography>
							</TableCell>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								align="right"
							>
								50 MB
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								component="th"
								align="left"
							>
								<Typography>Creation Date</Typography>
							</TableCell>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								align="right"
							>
								{data !== null
									? moment(data.creationDate).format("LL LTS")
									: "-"}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								component="th"
								align="left"
							>
								<Typography>Last free update</Typography>
							</TableCell>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								align="right"
							>
								{data !== null
									? moment(data.lastUpdated).format("LL LTS")
									: "-"}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								component="th"
								align="left"
							>
								<Typography>Last Event Backup</Typography>
							</TableCell>
							<TableCell
								sx={{
									borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
								}}
								align="right"
							>
								-
							</TableCell>
						</TableRow>
					</Table>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "center" }}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {}}
						sx={{ margin: 1 }}
					>
						<PowerSettingsNew sx={{ marginRight: 1 }} />
						<Typography>Reset Feed</Typography>
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {}}
						sx={{ margin: 1 }}
					>
						<Loop sx={{ marginRight: 1 }} />
						<Typography>Regenerate Feed</Typography>
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {}}
						sx={{ margin: 1 }}
					>
						<Redo sx={{ marginRight: 1 }} />
						<Typography>Recreate Database</Typography>
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {}}
						sx={{ margin: 1 }}
					>
						<GetApp sx={{ marginRight: 1 }} />
						<Typography>Export Event</Typography>
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
});
