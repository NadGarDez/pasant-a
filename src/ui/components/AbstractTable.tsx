import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import React from "react";
import { type keyValueInterface } from "../../constants/tableConstants";
import { cellSelector } from "../../utils/cellSelector";

interface props<T> {
	cols: keyValueInterface[];
	rows: T[];
	page?: number;
	limit?: number;
	total?: number;
	renderActions?: (item: T) => JSX.Element;
	onChangePagination?: (page: number, rowsPerPage: number) => void;
}

export const AbstractTable = <T extends object>(
	props: props<T>,
): JSX.Element => {
	const { cols, rows, limit, page, renderActions, total, onChangePagination } =
		props;

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	): void => {
		if (onChangePagination !== undefined) {
			onChangePagination(newPage, limit ?? 0);
		}
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		if (onChangePagination !== undefined) {
			onChangePagination(0, parseInt(event.target.value, 10));
		}
	};

	return (
		<Table>
			<TableHead>
				<TableRow>
					{cols.map((item, index) => (
						<TableCell key={`table_headier_item_${index}`}>
							{item.label}
						</TableCell>
					))}
					{renderActions !== undefined ? <TableCell>Actions</TableCell> : null}
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
										(subItem.cellComponent !== undefined
											? cellSelector[subItem.cellComponent](cellValue)
											: cellValue) as string
									}
								</TableCell>
							);
						})}
						{renderActions !== undefined ? (
							<TableCell>{renderActions(item)}</TableCell>
						) : null}
					</TableRow>
				))}
			</TableBody>
			{onChangePagination !== undefined ? (
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							count={total ?? cols.length}
							rowsPerPage={limit ?? 0}
							page={page ?? 0}
							slotProps={{
								select: {
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								},
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			) : null}
		</Table>
	);
};
