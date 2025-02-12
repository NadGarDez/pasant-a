import React from "react";
import { SortableList } from "../components/sortableList";
import { type eventBanner } from "../../types/events";
import { useAppSelector } from "../../hooks/reduxHooks";
import { bannersSelector } from "../../redux/slicers/bannersSlice";
import { listBannerPutRequest } from "../../utils/apiRequest";
import { useParams } from "react-router-dom";
import { internalSessionSelector } from "../../redux/slicers/internalSessionSlice";

export const SortBannersTab = (): JSX.Element => {
	const { data } = useAppSelector(bannersSelector);

	const { id } = useParams<{ id: string }>();
	const token = useAppSelector(internalSessionSelector);

	const extractor = (item: eventBanner): string => item.idResource;
	const keyExtractor = (item: eventBanner): string =>
		`sortable_banner_${item.idResource}`;

	const onChange = (items: eventBanner[]): void => {
		console.log(items, "super items", token);

		void listBannerPutRequest({
			token,
			items,
			eventId: id,
		});
	};

	return (
		<SortableList<eventBanner>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={data}
			onChange={onChange}
		/>
	);
};
