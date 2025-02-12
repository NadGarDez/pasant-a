import React, { useState } from "react";
import { SortableContainer } from "./SortableContainer";
import { SortableItem } from "./SortableItem";
import { Box, Button } from "@mui/material";
import { arrayMoveImmutable } from "array-move";

interface props<T> {
	data: T[];
	valueExtractor: (item: T) => string;
	keyExtractor: (item: T) => string;
	onChange: (items: T[]) => void;
}

export const SortableList = <T extends object>(
	props: props<T>,
): JSX.Element => {
	const { data: initialData, onChange, valueExtractor, keyExtractor } = props;

	const [data, setData] = useState<T[]>(initialData);

	const onSortEnd = ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}): void => {
		const newItems = arrayMoveImmutable(data, oldIndex, newIndex).map(
			(item, index) => ({
				...item,
				sortOrder: index,
			}),
		);

		setData(newItems);
	};

	const onClickCallback = (): void => {
		onChange(data);
	};

	return (
		<Box flex={1}>
			<SortableContainer onSortEnd={onSortEnd}>
				<>
					{data.map((item, index) => (
						<SortableItem
							key={keyExtractor(item)}
							value={valueExtractor(item)}
							index={index}
						/>
					))}
				</>
			</SortableContainer>
			<Box
				sx={{
					marginTop: 2,
					display: "flex",
					flexGrow: 1,
					flexDirection: "row",
					justifyContent: "flex-end",
				}}
			>
				<Button
					variant="contained"
					color="primary"
					onClick={onClickCallback}
					disabled={data === initialData}
				>
					Save
				</Button>
			</Box>
		</Box>
	);
};
