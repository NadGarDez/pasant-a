import React from "react";
import { SortableList } from "../components/sortableList";
import type { eventVideo } from "../../types/events";
import { videoStreamsSelector } from "../../redux/slicers/videoStreamsSlice";
import { useAppSelector } from "../../hooks/reduxHooks";

export const SortVideoTab = (): JSX.Element => {
	const { data } = useAppSelector(videoStreamsSelector);

	const extractor = (item: eventVideo): string => item.name;
	const keyExtractor = (item: eventVideo): string =>
		`sortable_banner_${item.idLiveStream}`;

	const onChange = (items: eventVideo[]): void => {
		console.log(items);
	};

	return (
		<SortableList<eventVideo>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={data}
			onChange={onChange}
		/>
	);
};
