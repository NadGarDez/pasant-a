import React, { useEffect } from "react";
import { SortableList } from "../components/sortableList";
import { type eventBanner } from "../../types/events";
import { useAppSelector } from "../../hooks/reduxHooks";
import { bannersSelector } from "../../redux/slicers/bannersSlice";
import { listBannerPutRequest } from "../../utils/apiRequest";
import { useParams } from "react-router-dom";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";
import { useLocalMultiRequest } from "../../hooks/useLocalMultiRequest";
import { useSnackbar } from "notistack";

export const SortBannersTab = (): JSX.Element => {
	const { data } = useAppSelector(bannersSelector);

	const { refetch, reducerStatus } =
		useLocalMultiRequest<eventBanner>(listBannerPutRequest);

	const { enqueueSnackbar } = useSnackbar();

	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

	const extractor = (item: eventBanner): string => item.idResource;
	const keyExtractor = (item: eventBanner): string =>
		`sortable_banner_${item.idResource}`;

	const onChange = (items: eventBanner[]): void => {
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
		<SortableList<eventBanner>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={data}
			onChange={onChange}
		/>
	);
};
