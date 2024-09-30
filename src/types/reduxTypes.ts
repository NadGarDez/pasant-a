import type { reduxRoot } from "../redux/reduxRoot";

export type reduxStoreType = ReturnType<typeof reduxRoot.getState>;

export type appDispatch = typeof reduxRoot.dispatch;

export type listReducerStatus = "NEUTRAL" | "LOADING" | "SUCCESS" | "ERROR";

export interface listReducerInterface<T> {
	status: listReducerStatus;
	data: T[];
	totalCount: number;
	error: string | null;
	page: number;
	limit: number;
}
