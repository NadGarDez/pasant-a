/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Alert,
	Box,
	Button,
	Icon,
	IconButton,
	LinearProgress,
	Paper,
} from "@mui/material";
import React, { useEffect } from "react";
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
import { useLocalRequest } from "../../hooks/useLocalRequest";
import {
	videoDeleteRequest,
	videoPostRequest,
	videoPutRequest,
} from "../../utils/apiRequest";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useSnackbar } from "notistack";

export const VideoTableTab = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const formStatus = useAppSelector(modalFormStatusSelector);
	const dispatch = useAppDispatch();
	const token = useAppSelector(internalSessionSelector);
	const activeItem = useAppSelector(activeitemSelector);

	const { refetch: refetchPut, reducerStatus: statusPut } =
		useLocalRequest(videoPutRequest);
	const { refetch: refetchPost, reducerStatus: statusPost } =
		useLocalRequest(videoPostRequest);
	const { refetch: refetchDelete, reducerStatus: statusDelete } =
		useLocalRequest(videoDeleteRequest);

	const { enqueueSnackbar } = useSnackbar();

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

	const onDelete = (videoId: string): void => {
		void refetchDelete({
			token,
			videoId,
			eventId: id,
		});
	};

	const onSubmit = (values: eventVideo): void => {
		if (formStatus === "CREATE") {
			void refetchPost({
				token,
				bodyObject: {
					...values,
					type: 0,
				},
				eventId: id,
			});
		} else if (formStatus === "EDIT") {
			void refetchPut({
				token,
				bodyObject: {
					...values,
					type: 0,
				},
				videoId: values.idLiveStream,
				eventId: id,
			});
		}
	};

	useEffect(() => {
		if (
			statusPut === "SUCCESSED" ||
			statusDelete === "SUCCESSED" ||
			statusPost === "SUCCESSED"
		) {
			closeModal();
			reload({
				page,
				limit: 5,
				eventId: id,
			});
			enqueueSnackbar("Success", { variant: "success" });
		} else if (
			statusPut === "ERROR" ||
			statusDelete === "ERROR" ||
			statusPost === "ERROR"
		) {
			closeModal();
			enqueueSnackbar("Error. Try again", { variant: "error" });
		}
	}, [statusPut, statusDelete, statusPost]);

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
		</>
	);
};
