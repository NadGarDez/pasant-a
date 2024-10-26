import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageToolbar } from "../ui/components/PageToolbar";

const onAdd = jest.fn();
const onQueue = jest.fn();

describe("PageToolbar Component", () => {
	it("should render the toolbar with title, add button, and queue button", () => {
		render(<PageToolbar title="My Title" onAdd={onAdd} onQueue={onQueue} />);

		const title = screen.getByText("My Title");
		const addButton = screen.getByRole("button", { name: "Add" });
		const queueButton = screen.getByRole("button", { name: "Queue" });

		expect(title).toBeInTheDocument();
		expect(addButton).toBeInTheDocument();
		expect(queueButton).toBeInTheDocument();
	});

	it("should not render the queue button if not provided", () => {
		render(<PageToolbar title="My Title" onAdd={() => {}} />);

		const queueButton = screen.queryByRole("button", { name: "Queue" });
		expect(queueButton).not.toBeInTheDocument();
	});

	it("should call the onAdd and onQueue functions when buttons are clicked", () => {
		render(<PageToolbar title="My Title" onAdd={onAdd} onQueue={onQueue} />);

		const addButton = screen.getByRole("button", { name: "Add" });
		const queueButton = screen.getByRole("button", { name: "Queue" });

		userEvent.click(addButton);
		userEvent.click(queueButton);

		expect(onAdd).toHaveBeenCalledTimes(1);
		expect(onQueue).toHaveBeenCalledTimes(1);
	});
});
