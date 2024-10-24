import { Paper, Box, Switch, IconButton, Icon } from "@mui/material";
import React, { useEffect } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { AbstractTable } from "../components/AbstractTable";
import { bannersTableStructure } from "../../constants/tableConstants";
import { useAppSelector } from "../../hooks/reduxHooks";
import { activeEventSelector } from "../../redux/slicers/eventsSlice";
import { getBannersRequest } from "../../utils/apiRequest";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";

export const BannersTableTab = (): JSX.Element => {
	const { data } = useAppSelector(activeEventSelector);
	const { oktaSessionId } = useAppSelector(internalSessionSelector);

	const superRequest = async (): Promise<void> => {
		const result = await getBannersRequest(
			oktaSessionId ?? "",
			data?.idEvent ?? "",
		);
		console.log(result);
	};

	useEffect(() => {
		if (data !== null) {
			void superRequest();
		}
	}, []);

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
						// onCreate();
					}}
					onQueue={() => {}}
				/>
				<Box flex={1} pl={3} pr={3}>
					<AbstractTable<object>
						cols={bannersTableStructure}
						rows={[]}
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
										console.log(item);
									}}
								>
									<Icon color="primary" fontSize="inherit">
										edit
									</Icon>
								</IconButton>
								<IconButton
									onClick={() => {
										console.log(item); // should be the item ids
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
			{/* <ModalForm
				open={modalStatus !== "HIDDEN"}
				title={appMenuModalTitles[modalStatus]}
				handleClose={closeModal}
			>
				<AbstractForm
					fields={appMenuFormStructure}
					scheme={appMenuFormSchema}
					initialValues={activeItemData ?? {}}
					onSubmit={onSubmit}
					onDimiss={closeModal}
				/>
			</ModalForm>
			<
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={activeItemStatus === "ERROR" || activeItemStatus === "SUCCESS"}
				message={activeItemError ?? "Operation completed successfully"}
			/> */}
		</>
	);
};
