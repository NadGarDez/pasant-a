import React from "react";
import { SortableList } from "../components/sortableList";
import { mapsSelector } from "../../redux/slicers/MapsSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import type { eventMap } from "../../types/events";

export const SortMapsTab = (): JSX.Element => {
	const { data } = useAppSelector(mapsSelector);

	const extractor = (item: eventMap): string => item.name;
	const keyExtractor = (item: eventMap): string =>
		`sortable_banner_${item.idEventMap}`;

	const onChange = (items: eventMap[]): void => {
		console.log(items);
	};

	return (
		<SortableList<eventMap>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={data}
			onChange={onChange}
		/>
	);
};
