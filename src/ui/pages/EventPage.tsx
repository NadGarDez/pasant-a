import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControlLabel,
	LinearProgress,
	Table,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
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
import { useLocalRequest } from "../../hooks/useLocalRequest";
import {
	regenerateFeed,
	exportEvent,
	recreateDatabase,
	resetFeed,
	fudamentalPutRequest,
} from "../../utils/apiRequest";
import { useSnackbar } from "notistack";
import { UncontrolledSwitchField } from "../form/UncontrolledSwitchField";
import { useAppSelector } from "../../hooks/reduxHooks";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";

export const EventPage = withInternalSession((): JSX.Element => {
	const { id } = useParams<{ id: string }>();

	const token = useAppSelector(internalSessionSelector);

	const [areWorkersActive] = useState<boolean>(false);

	const { enqueueSnackbar } = useSnackbar();

	const { refetch: regenerateRequest, reducerStatus: regenerateStaus } =
		useLocalRequest(regenerateFeed);

	const { refetch: exportRequest, reducerStatus: exportStatus } =
		useLocalRequest(exportEvent);

	const { refetch: recreateRequest, reducerStatus: recreateStatus } =
		useLocalRequest(recreateDatabase);

	const { refetch: resetRequest, reducerStatus: resetStatus } =
		useLocalRequest(resetFeed);

	const { refetch: refetchPut, reducerStatus } =
		useLocalRequest(fudamentalPutRequest);

	const {
		activeItem: { data, status, error },
		get,
	} = useEvent(id);

	useEffect(() => {
		get();
	}, [id]);

	const length = useMemo(() => {
		if (data?.length !== undefined) {
			return data.length / 1024 / 1024;
		}
		return 0;
	}, [data]);

	const recreateInternal = (): void => {
		if (areWorkersActive) {
			void regenerateRequest({
				id,
			});
		} else {
			enqueueSnackbar("The worker functions are disabled", { variant: "info" });
		}
	};

	const regenerateInternal = (): void => {
		if (areWorkersActive) {
			void exportRequest({
				id,
			});
		} else {
			enqueueSnackbar("The worker functions are disabled", { variant: "info" });
		}
	};

	const exportEventInternal = (): void => {
		if (areWorkersActive) {
			void recreateRequest({
				id,
			});
		} else {
			enqueueSnackbar("The worker functions are disabled", { variant: "info" });
		}
	};

	const resetInternal = (): void => {
		if (areWorkersActive) {
			void resetRequest({
				id,
			});
		} else {
			enqueueSnackbar("The worker functions are disabled", { variant: "info" });
		}
	};

	useEffect(() => {
		if (
			resetStatus === "SUCCESSED" ||
			recreateStatus === "SUCCESSED" ||
			exportStatus === "SUCCESSED" ||
			regenerateStaus === "SUCCESSED" ||
			reducerStatus === "SUCCESSED"
		) {
			enqueueSnackbar("Success", { variant: "success" });
			get();
		} else if (
			resetStatus === "ERROR" ||
			recreateStatus === "ERROR" ||
			exportStatus === "ERROR" ||
			regenerateStaus === "ERROR" ||
			reducerStatus === "ERROR"
		) {
			enqueueSnackbar("Error. Try again", { variant: "error" });
		}
	}, [
		resetStatus,
		recreateStatus,
		exportStatus,
		regenerateStaus,
		reducerStatus,
	]);

	const onChange = (checked: boolean): void => {
		const status = checked ? "PUBLISHED" : "READY";

		void refetchPut({
			token,
			eventId: id,
			bodyObject: {
				...data,
				status,
			},
		});
	};

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
					control={
						<UncontrolledSwitchField
							initialValue={data?.status === "PUBLISHED"}
							onChange={onChange}
						/>
					}
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
								{length} MB
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
						onClick={resetInternal}
						sx={{ margin: 1 }}
					>
						<PowerSettingsNew sx={{ marginRight: 1 }} />
						<Typography>Reset Feed</Typography>
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={regenerateInternal}
						sx={{ margin: 1 }}
					>
						<Loop sx={{ marginRight: 1 }} />
						<Typography>Regenerate Feed</Typography>
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={recreateInternal}
						sx={{ margin: 1 }}
					>
						<Redo sx={{ marginRight: 1 }} />
						<Typography>Recreate Database</Typography>
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={exportEventInternal}
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
