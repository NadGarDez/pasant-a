export type INTERNAL_LOGIN_POSIBLE_STATUS =
	| "UNAUTHENTICATED"
	| "AUTHENTICATING"
	| "AUTHENTICATION_ERROR"
	| "AUTHENTICATED";
export interface INTERNAL_LOGIN_REQUEST_PARAMS {
	oktaSessionId: string;
	userId: string;
	accessToken: string;
}

export interface internalSessionReducerInteface {
	oktaSessionId: string | null;
	userId: string | null;
	status: INTERNAL_LOGIN_POSIBLE_STATUS;
	errorMesssage?: string;
}
