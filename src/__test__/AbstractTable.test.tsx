import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AbstractTable } from "../ui/components/AbstractTable";
import { type keyValueInterface } from "../constants/tableConstants";

describe("AbstractTable Component", () => {
	it("should render the table header with column labels", () => {
		const mockCols: keyValueInterface[] = [
			{ key: "name", label: "Name" },
			{ key: "email", label: "Email" },
		];

		const mockRows: any[] = [
			{ name: "John Doe", email: "john.doe@example.com" },
			{ name: "Jane Smith", email: "jane.smith@example.com" },
		];

		render(<AbstractTable cols={mockCols} rows={mockRows} />);

		// const headerRow = screen.getByRole('row');
		const nameHeader = screen.getByText("Name");
		const emailHeader = screen.getByText("Email");

		// expect(headerRow).toBeInTheDocument();
		expect(nameHeader).toBeInTheDocument();
		expect(emailHeader).toBeInTheDocument();
	});

	it("should render table rows with cell values", () => {
		const mockCols: keyValueInterface[] = [
			{ key: "name", label: "Name" },
			{ key: "age", label: "Age" },
		];

		const mockRows: any[] = [
			{ name: "John Doe", age: 30 },
			{ name: "Jane Smith", age: 25 },
		];

		render(<AbstractTable cols={mockCols} rows={mockRows} />);

		const rows = screen.getAllByRole("row");
		const firstRowCells = rows[1].querySelectorAll("td");

		expect(firstRowCells[0]).toHaveTextContent("John Doe");
		expect(firstRowCells[1]).toHaveTextContent("30");
	});

	it("should render table footer with pagination controls (if provided)", () => {
		const mockCols: keyValueInterface[] = [{ key: "name", label: "Name" }];

		const mockRows: any[] = [{ name: "John Doe" }];
		const mockTotal = 10;
		const mockLimit = 5;
		const mockPage = 1;

		const onChangePagination = jest.fn();

		render(
			<AbstractTable
				cols={mockCols}
				rows={mockRows}
				total={mockTotal}
				limit={mockLimit}
				page={mockPage}
				onChangePagination={onChangePagination}
			/>,
		);

		const select = screen.getByRole("combobox");

		expect(select).toBeInTheDocument();

		fireEvent.change(select, { target: { value: "10" } });

		expect(onChangePagination).toHaveBeenCalledTimes(1);
		expect(onChangePagination).toHaveBeenCalledWith(0, 10);
	});
});
