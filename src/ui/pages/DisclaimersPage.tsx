import { Box, Icon, IconButton, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { withInternalSession } from "../../HOCs/withInternalSession";
import { AbstractTable } from "../components/AbstractTable";
import type { disclaimer } from "../../types/disclaimerTypes";
import { useGetDisclaimers } from "../../hooks/useGetDisclaimers";
import { disclaimerTableStructure } from "../../constants/tableConstants";
import { PageToolbar } from "../components/PageToolbar";
import { ModalForm } from "../components/ModalForm";
import { AbstractForm } from "../components/AbstractForm";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import {
	disclaimerFormSchema,
	disclaimersFormStructure,
} from "../../constants/formConstants";
import {
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import { type modalFormStatus } from "../../types/uiTypes";
import { useDispatch } from "react-redux";

export const DisclaimersPage = withInternalSession((): JSX.Element => {
	const { data, status, totalCount, reload, limit, page } = useGetDisclaimers();
	const formStatus = useAppSelector(modalFormStatusSelector);
	const dispatch = useDispatch();

	if (status === "LOADING" || status === "NEUTRAL") {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="primary" />
			</Box>
		);
	}

	const onChangePagination = (page: number, rowsPerPage: number): void => {
		reload({
			page,
			limit: rowsPerPage,
		});
	};

	const onSubmit = (values: disclaimer): void => {
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

	const onEdit = (item: disclaimer): void => {
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
					title="Disclaimers"
					onAdd={() => {
						console.log("adding");
					}}
				/>
				<AbstractTable<disclaimer>
					cols={disclaimerTableStructure}
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
									onDelete(item.idDisclaimer);
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
					fields={disclaimersFormStructure}
					scheme={disclaimerFormSchema}
					initialValues={data ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
		</>
	);
});
