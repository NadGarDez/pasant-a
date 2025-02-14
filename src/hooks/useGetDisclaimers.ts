import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { type listReducerInterface } from "../types/reduxTypes";
import { disclaimersSelector } from "../redux/slicers/disclaimersSlice";
import { getDisclaimersSagasAction } from "../sagas/disclaimerSagas";
import { type disclaimer } from "../types/disclaimerTypes";

interface reload {
	reload: (params: { page: number; limit: number }) => void;
}

export const useGetDisclaimers = (): listReducerInterface<disclaimer> &
	reload => {
	const configs = useAppSelector(disclaimersSelector);
	const dispatch = useAppDispatch();

	const reload = (params: { page: number; limit: number }): void => {
		dispatch(getDisclaimersSagasAction(params));
	};

	useEffect(() => {
		const { status, page, limit } = configs;

		if (status === "NEUTRAL") {
			dispatch(
				getDisclaimersSagasAction({
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
