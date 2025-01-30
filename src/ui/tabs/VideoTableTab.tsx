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
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import {
	activeitemSelector,
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import { type eventVideo } from "../../types/events";
import { ModalForm } from "../components/ModalForm";
import { AbstractForm } from "../components/AbstractForm";
import {
	videoStreamFormFieldStructure,
	videoStreamsFormSchema,
} from "../../constants/formConstants";
import { type modalFormStatus } from "../../types/uiTypes";

export const VideoTableTab = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const formStatus = useAppSelector(modalFormStatusSelector);
	const dispatch = useAppDispatch();
	const activeItem = useAppSelector(activeitemSelector);
	console.log(activeItem, "super item");

	const {
		data: videoStreamsData,
		status,
		error,
		reload,
		limit,
		totalCount,
		page,
	} = useList<eventVideo>({
		selector: videoStreamsSelector,
		action: getVideoStreamsSagasAction,
		aditionalProps: {
			eventId: id,
		},
	});

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
			eventId: id,
		});
	};

	const closeModal = (): void => {
		dispatch(hideModalForm());
		dispatch(clearActiveItem());
	};

	const openModal = (mode: modalFormStatus): void => {
		dispatch(startModalForm(mode));
	};

	const startActiveItem = (item: object): void => {
		dispatch(initializeActiveItem(item));
	};

	const onCreate = (): void => {
		startActiveItem({}); // should be a default value for void form
		openModal("CREATE");
	};

	const onEdit = (item: eventVideo): void => {
		console.log(item, "super item");
		startActiveItem(item as object);
		openModal("EDIT");
	};

	const onDelete = (id: string): void => {
		console.log(id);
	};

	const onSubmit = (values: eventVideo): void => {
		if (formStatus === "CREATE") {
			// dispatch(
			// 	postBannerSagasAction({
			// 		data: values,
			// 	}),
			// );
		} else if (formStatus === "EDIT") {
			// dispatch(
			// 	putBannerSagasAction({
			// 		data: values,
			// 		id: values.idBanner,
			// 	}),
			// );
		}
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
						onCreate();
					}}
					onQueue={() => {}}
				/>
				<Box flex={1} pl={3} pr={3}>
					<AbstractTable<eventVideo>
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
										onEdit(item);
									}}
								>
									<Icon color="primary" fontSize="inherit">
										edit
									</Icon>
								</IconButton>
								<IconButton
									onClick={() => {
										console.log(item); // should be the item ids
										onDelete(item.idLiveStream);
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
			<ModalForm
				open={formStatus !== "HIDDEN"}
				title="Videos"
				handleClose={closeModal}
			>
				<AbstractForm
					loading={false}
					fields={videoStreamFormFieldStructure}
					scheme={videoStreamsFormSchema}
					initialValues={activeItem.data ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
			{/* <
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={activeItemStatus === "ERROR" || activeItemStatus === "SUCCESS"}
				message={activeItemError ?? "Operation completed successfully"}
			/> */}
		</>
	);
};
