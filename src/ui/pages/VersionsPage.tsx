import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React from "react";
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

export const VersionsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetVersions();
	const dispatch = useAppDispatch();
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

	const onSubmit = (values: version): void => {
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

	const onDelete = (eventId: string): void => {
		console.log(eventId);
		// void refetchDelete({
		// 	token,
		// 	bannerId,
		// 	eventId: id,
		// });
	};

	return (
		<>
			<Paper
				sx={{ minHeight: 400, width: "100%", padding: 24 / 8 }}
				elevation={3}
			>
				<PageToolbar
					title="Versions"
					onAdd={() => {
						console.log("adding");
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
					initialValues={data ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
		</>
	);
});
