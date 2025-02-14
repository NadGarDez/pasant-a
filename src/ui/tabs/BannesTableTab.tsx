import {
	Paper,
	Box,
	IconButton,
	Icon,
	Alert,
	Button,
	LinearProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { AbstractTable } from "../components/AbstractTable";
import { bannersTableStructure } from "../../constants/tableConstants";
import { useList } from "../../hooks/useList";
import { type eventBanner } from "../../types/events";
import { bannersSelector } from "../../redux/slicers/bannersSlice";
import { getBannersSagasAction } from "../../sagas/EventSubItemsSagas";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import { ModalForm } from "../components/ModalForm";
import { AbstractForm } from "../components/AbstractForm";
import {
	advertisementForm,
	advertisementFormSchema,
} from "../../constants/formConstants";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
	activeitemSelector,
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import { type modalFormStatus } from "../../types/uiTypes";
import { useLocalRequest } from "../../hooks/useLocalRequest";
import {
	bannerDeleteRequest,
	bannerPostRequest,
	bannerPutRequest,
} from "../../utils/apiRequest";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useSnackbar } from "notistack";

export const BannersTableTab = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const formStatus = useSelector(modalFormStatusSelector);
	const dispatch = useAppDispatch();
	const token = useAppSelector(internalSessionSelector);
	const { data } = useAppSelector(activeitemSelector);

	const { enqueueSnackbar } = useSnackbar();

	const { refetch: refetchPut, reducerStatus: statusPut } =
		useLocalRequest(bannerPutRequest);
	const { refetch: refetchPost, reducerStatus: statusPost } =
		useLocalRequest(bannerPostRequest);
	const { refetch: refetchDelete, reducerStatus: statusDelete } =
		useLocalRequest(bannerDeleteRequest);

	const {
		data: bannersData,
		status,
		reload,
		error,
		page,
		totalCount,
		limit,
	} = useList<eventBanner>({
		selector: bannersSelector,
		action: getBannersSagasAction,
		aditionalProps: {
			eventId: id,
		},
	});

	console.log(bannersData, "super");

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

	const onEdit = (item: eventBanner): void => {
		startActiveItem(item as object);
		openModal("EDIT");
	};

	const onDelete = (bannerId: string): void => {
		void refetchDelete({
			token,
			bannerId,
			eventId: id,
		});
	};

	const onSubmit = (values: eventBanner): void => {
		if (formStatus === "CREATE") {
			void refetchPost({
				token,
				bodyObject: {
					...values,
					type: 1,
					idEvent: id,
				},
				eventId: id,
			});
		} else if (formStatus === "EDIT") {
			void refetchPut({
				token,
				bodyObject: values,
				bannerId: values.idResource,
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
						onCreate();
					}}
					onQueue={() => {}}
				/>
				<Box flex={1} pl={3} pr={3}>
					<AbstractTable<eventBanner>
						cols={bannersTableStructure}
						rows={bannersData}
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
										onEdit(item);
									}}
								>
									<Icon color="primary" fontSize="inherit">
										edit
									</Icon>
								</IconButton>
								<IconButton
									onClick={() => {
										onDelete(item.idResource);
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
				title={"Banners"}
				handleClose={closeModal}
			>
				<AbstractForm
					loading={false}
					fields={advertisementForm}
					scheme={advertisementFormSchema}
					initialValues={data ?? {}}
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
