import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { useGetEvents } from "../../hooks/useGetEvents";
import { eventsTableStructure } from "../../constants/tableConstants";
import { type event } from "../../types/events";
import { AbstractTable } from "../components/AbstractTable";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PageToolbar } from "../components/PageToolbar";
import {
	activeEventSelector,
	clearActiveEventAction,
	initializeActiveEventItemAction,
} from "../../redux/slicers/eventsSlice";
import { ModalForm } from "../components/ModalForm";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import { useSelector } from "react-redux";
import { AbstractForm } from "../components/AbstractForm";
import {
	generalEventFormSchema,
	generalEventFormStructure,
} from "../../constants/formConstants";
import {
	activeitemSelector,
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import { type modalFormStatus } from "../../types/uiTypes";
import { useLocalRequest } from "../../hooks/useLocalRequest";
import {
	eventDeleteRequest,
	eventPostRequest,
	fudamentalPutRequest,
} from "../../utils/apiRequest";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useSnackbar } from "notistack";

export const EventsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetEvents();
	const formStatus = useSelector(modalFormStatusSelector);
	const currentEvents = useAppSelector(activeEventSelector);
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { refetch: refetchPut, reducerStatus: statusPut } =
		useLocalRequest(fudamentalPutRequest);

	const { refetch: refetchDelete, reducerStatus: statusDelete } =
		useLocalRequest(eventDeleteRequest);

	const { refetch: refetchPost, reducerStatus: statusPost } =
		useLocalRequest(eventPostRequest);
	const token = useAppSelector(internalSessionSelector);

	const { data: activeItem } = useAppSelector(activeitemSelector);

	useEffect(() => {
		dispatch(clearActiveEventAction());
	}, [currentEvents]);

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
		});
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

	const onSubmit = (values: event): void => {
		if (formStatus === "CREATE") {
			void refetchPost({
				token,
				bodyObject: {
					...values,
				},
			});
		} else if (formStatus === "EDIT") {
			void refetchPut({
				token,
				bodyObject: values,
				eventId: values.idEvent,
			});
		}
		console.log(values);
	};

	const startActiveItem = (item: object): void => {
		dispatch(initializeActiveItem(item));
	};

	const openModal = (mode: modalFormStatus): void => {
		dispatch(startModalForm(mode));
	};

	const closeModal = (): void => {
		dispatch(hideModalForm());
		dispatch(clearActiveItem());
	};

	const onEdit = (item: event): void => {
		startActiveItem(item as object);
		openModal("EDIT");
	};

	const onDelete = (eventId: string): void => {
		void refetchDelete({
			token,
			eventId,
		});
	};

	const handleClick = (item: event): void => {
		dispatch(initializeActiveEventItemAction(item));
		history.push(`event/${item.idEvent}/overview`);
	};

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
				sx={{ minHeight: 400, width: "100%", padding: 24 / 8 }}
				elevation={3}
			>
				<PageToolbar
					title="Events"
					onAdd={() => {
						console.log("adding");
					}}
				/>
				<AbstractTable<event>
					cols={eventsTableStructure}
					rows={data}
					limit={limit}
					page={page}
					total={totalCount}
					onChangePagination={onChangePagination}
					renderActions={item => (
						<>
							<IconButton
								color="default"
								aria-label="Info"
								onClick={() => {
									handleClick(item);
								}}
							>
								<Icon fontSize="inherit">error_outline</Icon>
							</IconButton>
							<IconButton
								onClick={() => {
									onEdit(item);
								}}
							>
								<Icon color="primary" fontSize="inherit">
									edit
								</Icon>
							</IconButton>
							<IconButton
								onClick={() => {
									onDelete(item.idEvent);
								}}
							>
								<Icon color="error" fontSize="inherit">
									delete
								</Icon>
							</IconButton>
						</>
					)}
				/>
			</Paper>
			<ModalForm
				open={formStatus !== "HIDDEN"}
				title={"Banners"}
				handleClose={closeModal}
			>
				<AbstractForm
					loading={false}
					fields={generalEventFormStructure}
					scheme={generalEventFormSchema}
					initialValues={activeItem ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
		</>
	);
});
