import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AbstractForm } from "../ui/components/AbstractForm";
import { type groupOfFields } from "../types/fomTypes";
import * as Yup from "yup";

// Mock form data
const mockFields: groupOfFields[] = [
	{
		fields: [
			{ name: "firstName", type: "text", label: "firstName" },
			{ name: "lastName", type: "text", label: "lastName" },
		],
	},
];

const mockInitialValues = {
	firstName: "",
	lastName: "",
};

const mockScheme = Yup.object({
	firstName: Yup.string(),
	lastName: Yup.string(),
});

const mockOnSubmit = jest.fn();

// Unit test for AbstractForm component
test("renders AbstractForm correctly and submits data", async () => {
	// Render the component with mock data
	render(
		<AbstractForm
			fields={mockFields}
			initialValues={mockInitialValues}
			scheme={mockScheme}
			onSubmit={mockOnSubmit}
		/>,
	);

	// Check if form fields are rendered based on field definitions
	const firstNameInput = screen.getByLabelText("firstName");
	expect(firstNameInput).toBeInTheDocument();

	const lastNameInput = screen.getByLabelText("lastName");
	expect(lastNameInput).toBeInTheDocument();

	// Simulate user input

	act(() => {
		fireEvent.change(firstNameInput, { target: { value: "John" } });
		fireEvent.change(lastNameInput, { target: { value: "Doe" } });
	});

	// // Check if input values are reflected in form state
	expect(screen.getByDisplayValue("John")).toBeInTheDocument();
	expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();

	await waitFor(() => {
		expect(screen.getByDisplayValue("John")).toBeInTheDocument();
		expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
	});
	// // Simulate form submission

	act(() => {
		fireEvent.click(screen.getByRole("button", { name: "Submit" }));
	});

	// // Check if onSubmit function is called with expected values

	await waitFor(() => {
		expect(mockOnSubmit).toHaveBeenCalledWith(
			{
				firstName: "John",
				lastName: "Doe",
			},
			expect.any(Object),
		);
	});
});

export {};
