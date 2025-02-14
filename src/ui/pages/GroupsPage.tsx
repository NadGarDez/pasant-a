import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { AbstractTable } from "../components/AbstractTable";
import type { group } from "../../types/groupTypes";
import { useGetGroups } from "../../hooks/useGetGroups";
import { groupsTableStructure } from "../../constants/tableConstants";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { PageToolbar } from "../components/PageToolbar";
import { ModalForm } from "../components/ModalForm";
import { AbstractForm } from "../components/AbstractForm";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import { type modalFormStatus } from "../../types/uiTypes";
import {
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import {
	groupsFormSchema,
	groupsFormStructure,
} from "../../constants/formConstants";

export const GroupsPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetGroups();
	const formStatus = useAppSelector(modalFormStatusSelector);
	const dispatch = useAppDispatch();

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

	const onSubmit = (values: group): void => {
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

	const onEdit = (item: group): void => {
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
					title="Groups"
					onAdd={() => {
						console.log("adding");
					}}
				/>
				<AbstractTable<group>
					cols={groupsTableStructure}
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
									onDelete(item.oktaId);
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
					fields={groupsFormStructure}
					scheme={groupsFormSchema}
					initialValues={data ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
		</>
	);
});
