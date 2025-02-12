import React, { useEffect, useMemo } from "react";
import { SortableList } from "../components/sortableList";
import type { eventVideo } from "../../types/events";
import { videoStreamsSelector } from "../../redux/slicers/videoStreamsSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useLocalMultiRequest } from "../../hooks/useLocalMultiRequest";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { listVideoPutRequest } from "../../utils/apiRequest";

export const SortVideoTab = (): JSX.Element => {
	const { data } = useAppSelector(videoStreamsSelector);

	const orderedData = useMemo(() => {
		const copy = [...data];
		return copy.sort((a, b) => {
			return a.sortOrder - b.sortOrder;
		});
	}, [data]);

	const { refetch, reducerStatus } =
		useLocalMultiRequest<eventVideo>(listVideoPutRequest);

	const { enqueueSnackbar } = useSnackbar();

	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

	const extractor = (item: eventVideo): string => item.name;
	const keyExtractor = (item: eventVideo): string =>
		`sortable_banner_${item.idLiveStream}`;

	const onChange = (items: eventVideo[]): void => {
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
		<SortableList<eventVideo>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={orderedData}
			onChange={onChange}
		/>
	);
};
