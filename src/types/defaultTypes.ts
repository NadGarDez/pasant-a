export interface defaultApiResponse<T> {
	status: number;
	data: T;
	statusText: string;
}

export interface ListResponse<T> {
	count: number;
	next: null | string;
	previous: null | string;
	results: T[];
}
