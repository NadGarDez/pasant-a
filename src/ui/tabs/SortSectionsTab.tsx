import React, { useEffect, useMemo } from "react";
import { type eventSection } from "../../types/events";
import { SortableList } from "../components/sortableList";
import { sectionsSelector } from "../../redux/slicers/sectionsSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useLocalMultiRequest } from "../../hooks/useLocalMultiRequest";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { listManagePutRequest } from "../../utils/apiRequest";

export const SortSectionsTab = (): JSX.Element => {
	const { data } = useAppSelector(sectionsSelector);

	const orderedData = useMemo(() => {
		const copy = [...data];
		return copy.sort((a, b) => {
			return a.sortOrder - b.sortOrder;
		});
	}, [data]);

	const { refetch, reducerStatus } =
		useLocalMultiRequest<eventSection>(listManagePutRequest);

	const { enqueueSnackbar } = useSnackbar();

	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

	const extractor = (item: eventSection): string => item.name;
	const keyExtractor = (item: eventSection): string =>
		`sortable_banner_${item.idSection}`;

	const onChange = (items: eventSection[]): void => {
		void refetch({
			token,
			items,
			eventId: id,
		});
	};

	useEffect(() => {
		if (reducerStatus === "SUCCESSED") {
			enqueueSnackbar("Success", { variant: "success" });
		} else if (reducerStatus === "ERROR") {
			enqueueSnackbar("Error. Try again", { variant: "error" });
		}
	}, [reducerStatus]);

	return (
		<SortableList<eventSection>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={orderedData}
			onChange={onChange}
		/>
	);
};
