// import axios from "axios";

interface apiCalls {
	OKTA_LOGIN: any;
	OKTA_LOGOUT: any;
	INTERNAL_LOGIN: any;
	INTERNAL_LOGOUT: any;
}

const oktaLogin = (): void => {};

const oktaLogout = (): void => {};

const internalLogin = (): void => {};

const internalLogout = (): void => {};

const apiFunctions: apiCalls = {
	OKTA_LOGIN: oktaLogin,
	OKTA_LOGOUT: oktaLogout,
	INTERNAL_LOGIN: internalLogin,
	INTERNAL_LOGOUT: internalLogout,
};

export default apiFunctions;
