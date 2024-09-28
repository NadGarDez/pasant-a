import { useEffect } from "react";
import {
	internalSessionSelector,
	startAuthSagas,
} from "../redux/slicers/internalSessionSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useOktaAuth } from "@okta/okta-react";
import { getLoginInternalRequestFromAuthState } from "../utils/apiRequest";
import { type internalSessionReducerInteface } from "../types/internalApiTypes";

export const useInternalAuth = (): internalSessionReducerInteface => {
	const { status, errorMesssage, ...rest } = useAppSelector(
		internalSessionSelector,
	);
	const dispatch = useAppDispatch();
	const { oktaAuth, authState } = useOktaAuth();

	const getDataLogin = async (): Promise<void> => {
		const data = await getLoginInternalRequestFromAuthState(oktaAuth);
		dispatch(startAuthSagas(data));
	};

	const closeSession = async (): Promise<void> => {
		await oktaAuth.closeSession();
	};

	useEffect(() => {
		if (authState?.isAuthenticated === true) {
			if (status === "UNAUTHENTICATED") {
				void getDataLogin();
			} else if (status === "AUTHENTICATION_ERROR") {
				alert(errorMesssage);
				void closeSession();
			}
		}
	}, [status, authState]);

	return {
		...rest,
		status,
		errorMesssage,
	};
};
