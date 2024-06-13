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
