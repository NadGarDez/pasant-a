import React, { useEffect, useMemo } from "react";
import { SortableList } from "../components/sortableList";
import { mapsSelector } from "../../redux/slicers/MapsSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import type { eventMap } from "../../types/events";
import { useLocalMultiRequest } from "../../hooks/useLocalMultiRequest";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { listMapPutRequest } from "../../utils/apiRequest";

export const SortMapsTab = (): JSX.Element => {
	const { data } = useAppSelector(mapsSelector);

	const orderedData = useMemo(() => {
		const copy = [...data];
		return copy.sort((a, b) => {
			return a.sortOrder - b.sortOrder;
		});
	}, [data]);

	const { refetch, reducerStatus } =
		useLocalMultiRequest<eventMap>(listMapPutRequest);

	const { enqueueSnackbar } = useSnackbar();

	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

	const extractor = (item: eventMap): string => item.name;
	const keyExtractor = (item: eventMap): string =>
		`sortable_banner_${item.idEventMap}`;

	const onChange = (items: eventMap[]): void => {
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
		<SortableList<eventMap>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={orderedData}
			onChange={onChange}
		/>
	);
};
