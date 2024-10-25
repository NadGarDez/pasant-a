import React from "react";
import { SortableList } from "../components/sortableList";
import { type eventBanner } from "../../types/events";
import { useAppSelector } from "../../hooks/reduxHooks";
import { bannersSelector } from "../../redux/slicers/bannersSlice";

export const SortBannersTab = (): JSX.Element => {
	const { data } = useAppSelector(bannersSelector);

	const extractor = (item: eventBanner): string => item.idResource;
	const keyExtractor = (item: eventBanner): string =>
		`sortable_banner_${item.idResource}`;

	const onChange = (items: eventBanner[]): void => {
		console.log(items);
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
