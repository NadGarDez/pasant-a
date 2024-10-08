import type { reduxRoot } from "../redux/reduxRoot";

export type reduxStoreType = ReturnType<typeof reduxRoot.getState>;

export type appDispatch = typeof reduxRoot.dispatch;

export type machineStatus = "NEUTRAL" | "LOADING" | "SUCCESS" | "ERROR";

export interface listActiveItemInterface<T> {
	status: "BLANK" | "NEUTRAL" | "LOADING" | "SUCCESS" | "ERROR";
	data: T | null;
	error: string | null;
}

export interface listReducerInterface<T> {
	status: machineStatus;
	data: T[];
	activeItem: listActiveItemInterface<T>;
	totalCount: number;
	error: string | null;
	page: number;
	limit: number;
}
