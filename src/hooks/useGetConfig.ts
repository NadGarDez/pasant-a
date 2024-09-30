import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { type listReducerInterface } from "../types/reduxTypes";
import { type config } from "../types/configTypes";
import { configsSelector } from "../redux/slicers/configSlice";
import { getConfigsSagasAction } from "../sagas/configSagas";

interface reload {
	reload: (params: { page: number; limit: number }) => void;
}

export const useGetConfigs = (): listReducerInterface<config> & reload => {
	const configs = useAppSelector(configsSelector);
	const dispatch = useAppDispatch();

	const reload = (params: { page: number; limit: number }): void => {
		dispatch(getConfigsSagasAction(params));
	};

	useEffect(() => {
		const { status, page, limit } = configs;

		if (status === "NEUTRAL") {
			dispatch(
				getConfigsSagasAction({
					page,
					limit,
				}),
			);
		}
	}, []);

	return {
		reload,
		...configs,
	};
};
