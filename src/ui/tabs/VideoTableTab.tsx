import {
	Alert,
	Box,
	Button,
	Icon,
	IconButton,
	LinearProgress,
	Paper,
	Switch,
} from "@mui/material";
import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import { AbstractTable } from "../components/AbstractTable";
import { videosTableStructure } from "../../constants/tableConstants";
import { useParams } from "react-router-dom";
import { videoStreamsSelector } from "../../redux/slicers/videoStreamsSlice";
import { useList } from "../../hooks/useList";
import { getVideoStreamsSagasAction } from "../../sagas/EventSubItemsSagas";

export const VideoTableTab = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();

	const {
		data: videoStreamsData,
		status,
		error,
		reload,
		limit,
		totalCount,
		page,
	} = useList<object>({
		selector: videoStreamsSelector,
		action: getVideoStreamsSagasAction,
		aditionalProps: {
			eventId: id,
		},
	});

	console.log(videoStreamsData, "hey jud");

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
			eventId: id,
		});
	};

	if (status === "ERROR") {
		return (
			<Alert
				severity="error"
				action={
					<Button
						size="small"
						variant="outlined"
						color="error"
						onClick={() => {
							reload({});
						}}
					>
						Reload
					</Button>
				}
			>
				{error ?? ""}
			</Alert>
		);
	}

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

	return (
		<>
			<Paper
				sx={{
					minHeight: 400,
					paddingTop: 24 / 8,
					paddingBottom: 24 / 8,
					borderRadius: 1,
				}}
				elevation={3}
			>
				<PageToolbar
					onAdd={() => {
						// onCreate();
					}}
					onQueue={() => {}}
				/>
				<Box flex={1} pl={3} pr={3}>
					<AbstractTable<object>
						cols={videosTableStructure}
						rows={videoStreamsData}
						limit={limit}
						page={page}
						total={totalCount}
						onChangePagination={onChangePagination}
						renderActions={item => (
							<Box
								sx={{
									flexGrow: 1,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-around",
									alignItems: "center",
								}}
							>
								<Switch
									checked={true}
									onChange={(event, checked) => {
										console.log(checked, item);
									}}
								/>
								<IconButton
									onClick={() => {
										console.log(item);
									}}
								>
									<Icon color="primary" fontSize="inherit">
										edit
									</Icon>
								</IconButton>
								<IconButton
									onClick={() => {
										console.log(item); // should be the item ids
									}}
								>
									<Icon color="error" fontSize="inherit">
										delete
									</Icon>
								</IconButton>
							</Box>
						)}
					/>
				</Box>
			</Paper>
			{/* <ModalForm
				open={modalStatus !== "HIDDEN"}
				title={appMenuModalTitles[modalStatus]}
				handleClose={closeModal}
			>
				<AbstractForm
					fields={appMenuFormStructure}
					scheme={appMenuFormSchema}
					initialValues={activeItemData ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
			<
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={activeItemStatus === "ERROR" || activeItemStatus === "SUCCESS"}
				message={activeItemError ?? "Operation completed successfully"}
			/> */}
		</>
	);
};
