import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { AbstractTable } from "../components/AbstractTable";
import { type version } from "../../types/versionTypes";
import { useGetVersions } from "../../hooks/useGetVersions";
import { versionsTableStructure } from "../../constants/tableConstants";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { PageToolbar } from "../components/PageToolbar";
import { type modalFormStatus } from "../../types/uiTypes";
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
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ModalForm } from "../components/ModalForm";
import { AbstractForm } from "../components/AbstractForm";
import {
	versionsFormSchema,
	versionsFormStructure,
} from "../../constants/formConstants";
import {
	versionsDeleteRequest,
	versionsPostRequest,
	versionsPutRequest,
} from "../../utils/apiRequest";
import { useSnackbar } from "notistack";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useLocalRequest } from "../../hooks/useLocalRequest";

export const VersionsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetVersions();
	const formStatus = useAppSelector(modalFormStatusSelector);

	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { refetch: refetchPut, reducerStatus: statusPut } =
		useLocalRequest(versionsPutRequest);

	const { refetch: refetchDelete, reducerStatus: statusDelete } =
		useLocalRequest(versionsDeleteRequest);

	const { refetch: refetchPost, reducerStatus: statusPost } =
		useLocalRequest(versionsPostRequest);

	const token = useAppSelector(internalSessionSelector);

	const { data: activeItem } = useAppSelector(activeitemSelector);

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

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
		});
	};

	const onSubmit = (values: version): void => {
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
				idVersion: values.idVersion,
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

	const onEdit = (item: version): void => {
		startActiveItem(item as object);
		openModal("EDIT");
	};

	const onDelete = (idVersion: string): void => {
		console.log(idVersion);
		void refetchDelete({
			token,
			idVersion,
		});
	};

	const onCreate = (): void => {
		startActiveItem({}); // should be a default value for void form
		openModal("CREATE");
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
					title="Versions"
					onAdd={() => {
						onCreate();
					}}
				/>
				<AbstractTable<version>
					cols={versionsTableStructure}
					rows={data}
					limit={limit}
					page={page}
					total={totalCount}
					onChangePagination={onChangePagination}
					renderActions={item => (
						<>
							<IconButton
								onClick={() => {
									onEdit(item);
									console.log(item);
								}}
							>
								<Icon color="primary" fontSize="inherit">
									edit
								</Icon>
							</IconButton>
							<IconButton
								onClick={() => {
									// onDelete(item.idDisclaimer);
									onDelete(item.idVersion);
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
					fields={versionsFormStructure}
					scheme={versionsFormSchema}
					initialValues={activeItem ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
		</>
	);
});
