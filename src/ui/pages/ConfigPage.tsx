import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { useGetConfigs } from "../../hooks/useGetConfig";
import { AbstractTable } from "../components/AbstractTable";
import { type config } from "../../types/configTypes";
import { configTableStructure } from "../../constants/tableConstants";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { PageToolbar } from "../components/PageToolbar";
import { useDispatch } from "react-redux";
import {
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
import { useAppSelector } from "../../hooks/reduxHooks";
import { AbstractForm } from "../components/AbstractForm";
import {
	configFormSchema,
	configFormStructure,
} from "../../constants/formConstants";

export const ConfigPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetConfigs();
	const dispatch = useDispatch();
	const formStatus = useAppSelector(modalFormStatusSelector);

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
		});
	};

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

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

	const onDelete = (eventId: string): void => {
		console.log(eventId);
		// void refetchDelete({
		// 	token,
		// 	bannerId,
		// 	eventId: id,
		// });
	};

	const onSubmit = (values: config): void => {
		// if (formStatus === "CREATE") {
		// 	void refetchPost({
		// 		token,
		// 		bodyObject: {
		// 			...values,
		// 			type: 1,
		// 			idEvent: id,
		// 		},
		// 		eventId: id,
		// 	});
		// } else if (formStatus === "EDIT") {
		// 	void refetchPut({
		// 		token,
		// 		bodyObject: values,
		// 		bannerId: values.idResource,
		// 		eventId: id,
		// 	});
		// }
		console.log(values);
	};

	const closeModal = (): void => {
		dispatch(hideModalForm());
		dispatch(clearActiveItem());
	};

	return (
		<>
			<Paper
				sx={{ minHeight: 400, width: "100%", padding: 24 / 8 }}
				elevation={3}
			>
				<PageToolbar
					title="Configs"
					onAdd={() => {
						console.log("adding");
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
					initialValues={data ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
		</>
	);
});
