import {
	Paper,
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

interface props<T> {
	cols: keyValueInterface[];
	rows: T[];
	page: number;
	limit: number;
	total: number;
	renderActions?: (item: T) => JSX.Element;
	onChangePagination: (page: number, rowsPerPage: number) => void;
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
		onChangePagination(newPage, limit);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		onChangePagination(0, parseInt(event.target.value, 10));
	};

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
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							count={total}
							rowsPerPage={limit}
							page={page}
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
			</Table>
		</Paper>
	);
};
