import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginLogoutButton } from "../ui/components/LoginLogoutButton";

describe("Button Render Tests", () => {
	test("test login text", () => {
		// mount
		render(
			<LoginLogoutButton
				isAuthenticated={false}
				login={() => {}}
				logout={() => {}}
			/>,
		);

		// asert ss

		expect(screen.getByRole("button")).toHaveTextContent("login");
	});

	test("test logout text", () => {
		render(
			<LoginLogoutButton
				isAuthenticated={true}
				login={() => {}}
				logout={() => {}}
			/>,
		);

		// asert

		expect(screen.getByRole("button")).toHaveTextContent("logout");
	});
});

describe("Callback Test", () => {
	test("test login call", () => {
		// mount

		const login = jest.fn();

		render(
			<LoginLogoutButton
				isAuthenticated={false}
				login={login}
				logout={() => {}}
			/>,
		);

		// act
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// assert

		expect(login).toBeCalledTimes(1);
	});

	test("test logout call", () => {
		// mount

		const logout = jest.fn();

		render(
			<LoginLogoutButton
				isAuthenticated={true}
				login={() => {}}
				logout={logout}
			/>,
		);

		// act

		const button = screen.getByRole("button");
		fireEvent.click(button);

		// assert

		expect(logout).toBeCalledTimes(1);
	});
});

export {};
