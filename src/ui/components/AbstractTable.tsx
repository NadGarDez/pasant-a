import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import { type keyValueInterface } from "../../constants/tableConstants";

interface props<T> {
	cols: keyValueInterface[];
	rows: T[];
	renderActions?: (item: T) => JSX.Element;
}

export const AbstractTable = <T extends object>(
	props: props<T>,
): JSX.Element => {
	const { cols, rows, renderActions } = props;

	return (
		<Paper
			sx={{ minHeight: 400, width: "100%", padding: 24 / 8 }}
			elevation={3}
		>
			<Table>
				<TableHead>
					<TableRow>
						{cols.map((item, index) => (
							<TableCell key={`table_headier_item_${index}`}>
								{item.label}
							</TableCell>
						))}
						{renderActions !== undefined ? (
							<TableCell>Actions</TableCell>
						) : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((item, indexItem) => (
						<TableRow key={`row_${indexItem}`}>
							{cols.map((subItem, subItemIndex) => {
								const cellValue = item[subItem.key as keyof T];
								return (
									<TableCell key={`table_cell_item_${subItemIndex}`}>
										{
											(subItem.cellFormatter !== undefined
												? subItem.cellFormatter(cellValue)
												: cellValue) as string
										}
									</TableCell>
								);
							})}
							<TableCell>
								{renderActions !== undefined ? (
									<>{renderActions(item)}</>
								) : null}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};
