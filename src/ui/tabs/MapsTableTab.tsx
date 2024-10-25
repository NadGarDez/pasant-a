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
import { mapTableStructure } from "../../constants/tableConstants";
import { AbstractTable } from "../components/AbstractTable";
import { useParams } from "react-router-dom";
import { useList } from "../../hooks/useList";
import { mapsSelector } from "../../redux/slicers/MapsSlice";
import { getMapsSagasActions } from "../../sagas/EventSubItemsSagas";
import type { eventMap } from "../../types/events";
import { AbstractForm } from "../components/AbstractForm";
import { ModalForm } from "../components/ModalForm";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import { type modalFormStatus } from "../../types/uiTypes";
import {
	mapsFormFieldStructure,
	mapsFormSchema,
} from "../../constants/formConstants";

export const MapsTableTab = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const formStatus = useAppSelector(modalFormStatusSelector);
	const dispatch = useAppDispatch();

	const {
		data: mapsData,
		error,
		reload,
		status,
		limit,
		page,
		totalCount,
	} = useList<eventMap>({
		selector: mapsSelector,
		action: getMapsSagasActions,
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

	const onEdit = (item: eventMap): void => {
		startActiveItem(item as object);
		openModal("EDIT");
	};

	const onDelete = (id: string): void => {
		console.log(id);
	};

	const onSubmit = (values: eventMap): void => {
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
						onCreate();
					}}
					onQueue={() => {}}
				/>
				<Box flex={1} pl={3} pr={3}>
					<AbstractTable<eventMap>
						cols={mapTableStructure}
						rows={mapsData}
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
										onEdit(item);
									}}
								>
									<Icon color="primary" fontSize="inherit">
										edit
									</Icon>
								</IconButton>
								<IconButton
									onClick={() => {
										onDelete(item.idEventMap); // should be the item ids
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
				title="Maps"
				handleClose={closeModal}
			>
				<AbstractForm
					fields={mapsFormFieldStructure}
					scheme={mapsFormSchema}
					initialValues={{}}
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
