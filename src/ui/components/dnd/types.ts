export interface dndInterface {
	status: "VOID" | "LOADING" | "FILLED" | "ERROR";
	preview: string | null;
	remoteImageUrl: string | null;
	errorMessage: string | null;
}

export interface dndAction {
	type: "NEUTRALIZE" | "LOAD" | "FILL" | "FAIL";
	payload?: string;
}
