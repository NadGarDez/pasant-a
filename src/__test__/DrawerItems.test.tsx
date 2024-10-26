import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type drawerItem } from "../types/uiTypes";
import { DrawerItem } from "../ui/components/DrawerItem";
import { renderWithProviders } from "./renderWithProviders";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { randomEventconst } from "../types/events";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe("DrawerItem Component", () => {
	it("should render correctly with basic content", () => {
		const mockItem: drawerItem = {
			text: "Test Item",
			icon: "home",
			items: [],
		};

		renderWithProviders(<DrawerItem {...mockItem} />);

		const listItem = screen.getByText("Test Item");
		const icon = screen.getByText("home"); // Adjust based on icon rendering

		expect(listItem).toBeInTheDocument();
		expect(icon).toBeInTheDocument();
	});

	it("should expand/collapse sub-items on click", () => {
		const mockItem: drawerItem = {
			text: "Test Item with Sub-Items",
			icon: "settings",
			items: [
				{ text: "Sub-Item 1", url: eventId => `/sub-item-1/${eventId}` },
				{ text: "Sub-Item 2", url: eventId => `/sub-item-2/${eventId}` },
			],
		};

		renderWithProviders(<DrawerItem {...mockItem} />);

		const listItem = screen.getByText("Test Item with Sub-Items");
		const chevron = screen.getByText("chevron_right"); // Icon indicating collapsed state

		expect(chevron).toBeInTheDocument();
		expect(screen.queryByText("expand_more")).not.toBeInTheDocument();

		fireEvent.click(listItem); // Simulate clicking the list item

		expect(screen.getByText("expand_more")).toBeInTheDocument(); // Icon indicating expanded state
		expect(screen.getByText("Sub-Item 1")).toBeInTheDocument();
		expect(screen.getByText("Sub-Item 2")).toBeInTheDocument();

		fireEvent.click(listItem); // Simulate clicking again to collapse
		expect(chevron).toBeInTheDocument();
	});

	it("should call navigate with correct URL on sub-item click (with event data)", () => {
		const mockItem: drawerItem = {
			text: "Test Item with Sub-Items",
			icon: "settings",
			items: [
				{ text: "Sub-Item 1", url: eventId => `/sub-item-1/${eventId}` },
				{ text: "Sub-Item 2", url: eventId => `/sub-item-2/${eventId}` },
			],
		};

		// const mockEvent = { idEvent: "123" };
		const history = createMemoryHistory();
		renderWithProviders(
			<MemoryRouter>
				<DrawerItem {...mockItem} />
			</MemoryRouter>,
			{
				preloadedState: {
					events: {
						activeItem: {
							data: randomEventconst,
							status: "SUCCESS",
							error: null,
						},
						status: "NEUTRAL",
						error: null,
						totalCount: 0,
						page: 0,
						limit: 5,
						data: [],
					},
				},
			},
		);

		const subItem = screen.getByText("Sub-Item 1");
		userEvent.click(subItem);

		console.log(history);

		expect(mockHistoryPush).toHaveBeenCalledWith(`/sub-item-1/123`);
	});
});
