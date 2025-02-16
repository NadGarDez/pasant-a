import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useGetConfigs } from "../../hooks/useGetConfig";
import { AbstractTable } from "../components/AbstractTable";
import { type config } from "../../types/configTypes";
import { configTableStructure } from "../../constants/tableConstants";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { PageToolbar } from "../components/PageToolbar";
import {
	activeitemSelector,
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import { type modalFormStatus } from "../../types/uiTypes";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import { ModalForm } from "../components/ModalForm";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { AbstractForm } from "../components/AbstractForm";
import {
	configFormSchema,
	configFormStructure,
} from "../../constants/formConstants";
import { useSnackbar } from "notistack";
import { useLocalRequest } from "../../hooks/useLocalRequest";
import {
	configDeleteRequest,
	configPostRequest,
	configPutRequest,
} from "../../utils/apiRequest";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";

export const ConfigPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetConfigs();
	const formStatus = useAppSelector(modalFormStatusSelector);

	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { refetch: refetchPut, reducerStatus: statusPut } =
		useLocalRequest(configPutRequest);

	const { refetch: refetchDelete, reducerStatus: statusDelete } =
		useLocalRequest(configDeleteRequest);

	const { refetch: refetchPost, reducerStatus: statusPost } =
		useLocalRequest(configPostRequest);

	const token = useAppSelector(internalSessionSelector);

	const { data: activeItem } = useAppSelector(activeitemSelector);

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

	const startActiveItem = (item: object): void => {
		dispatch(initializeActiveItem(item));
	};
	const openModal = (mode: modalFormStatus): void => {
		dispatch(startModalForm(mode));
	};

	const onEdit = (item: config): void => {
		startActiveItem(item as object);
		openModal("EDIT");
	};

	const onDelete = (idConfig: string): void => {
		void refetchDelete({
			token,
			idConfig,
		});
	};

	const onSubmit = (values: config): void => {
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
				idConfig: values.idConfig,
			});
		}
		console.log(values);
	};

	const onCreate = (): void => {
		startActiveItem({}); // should be a default value for void form
		openModal("CREATE");
	};

	const closeModal = (): void => {
		dispatch(hideModalForm());
		dispatch(clearActiveItem());
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
					title="Configs"
					onAdd={() => {
						onCreate();
					}}
				/>
				<AbstractTable<config>
					cols={configTableStructure}
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
								}}
							>
								<Icon color="primary" fontSize="inherit">
									edit
								</Icon>
							</IconButton>
							<IconButton
								onClick={() => {
									onDelete(item.idConfig);
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
					fields={configFormStructure}
					scheme={configFormSchema}
					initialValues={activeItem ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
		</>
	);
});
