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
import { AbstractTable } from "../components/AbstractTable";
import { sectionTableStructure } from "../../constants/tableConstants";
import { useList } from "../../hooks/useList";
import { useParams } from "react-router-dom";
import { sectionsSelector } from "../../redux/slicers/sectionsSlice";
import { getSectionsSagasActions } from "../../sagas/EventSubItemsSagas";
import { useSelector } from "react-redux";
import {
	hideModalForm,
	modalFormStatusSelector,
	startModalForm,
} from "../../redux/slicers/appSlicer";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
	clearActiveItem,
	initializeActiveItem,
} from "../../redux/slicers/activeItemSlicer";
import { type eventSection } from "../../types/events";
import { type modalFormStatus } from "../../types/uiTypes";
import { ModalForm } from "../components/ModalForm";
import { AbstractForm } from "../components/AbstractForm";
import {
	sectionFormFieldStructure,
	videoStreamsFormSchema,
} from "../../constants/formConstants";

export const SectionsTableTab = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();

	const formStatus = useSelector(modalFormStatusSelector);
	const dispatch = useAppDispatch();

	const {
		data: sectionsData,
		status,
		error,
		reload,
		page,
		limit,
		totalCount,
	} = useList<eventSection>({
		selector: sectionsSelector,
		action: getSectionsSagasActions,
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

	const onEdit = (item: eventSection): void => {
		startActiveItem(item as object);
		openModal("EDIT");
	};

	const onDelete = (id: string): void => {
		console.log(id);
	};

	const onSubmit = (values: eventSection): void => {
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
					<AbstractTable<eventSection>
						cols={sectionTableStructure}
						rows={sectionsData}
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
										onEdit(item); // should be the item ids
									}}
								>
									<Icon color="primary" fontSize="inherit">
										edit
									</Icon>
								</IconButton>
								<IconButton
									onClick={() => {
										onDelete(item.idSection);
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
				title="Sections"
				handleClose={closeModal}
			>
				<AbstractForm
					loading={false}
					fields={sectionFormFieldStructure}
					scheme={videoStreamsFormSchema}
					initialValues={{}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
			{/* 
			<
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={activeItemStatus === "ERROR" || activeItemStatus === "SUCCESS"}
				message={activeItemError ?? "Operation completed successfully"}
			/> */}
		</>
	);
};
