import React from "react";
import { type eventSection } from "../../types/events";
import { SortableList } from "../components/sortableList";
import { sectionsSelector } from "../../redux/slicers/sectionsSlice";
import { useAppSelector } from "../../hooks/reduxHooks";

export const SortSectionsTab = (): JSX.Element => {
	const { data } = useAppSelector(sectionsSelector);

	const extractor = (item: eventSection): string => item.name;
	const keyExtractor = (item: eventSection): string =>
		`sortable_banner_${item.idSection}`;

	const onChange = (items: eventSection[]): void => {
		console.log(items);
	};

	return (
		<SortableList<eventSection>
			valueExtractor={extractor}
			keyExtractor={keyExtractor}
			data={data}
			onChange={onChange}
		/>
	);
};
