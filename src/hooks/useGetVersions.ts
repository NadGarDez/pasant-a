import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { type listReducerInterface } from "../types/reduxTypes";
import { getVersionsSagasAction } from "../sagas/versionSagas";
import { type version } from "../types/versionTypes";
import { versionsSelector } from "../redux/slicers/versionSlice";

interface reload {
	reload: (params: { page: number; limit: number }) => void;
}

export const useGetVersions = (): listReducerInterface<version> & reload => {
	const reload = (params: { page: number; limit: number }): void => {
		dispatch(getVersionsSagasAction(params));
	};

	const events = useAppSelector(versionsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const { status, page, limit } = events;
		if (status === "NEUTRAL") {
			dispatch(
				getVersionsSagasAction({
					page,
					limit,
				}),
			);
		}
	}, []);

	return {
		reload,
		...events,
	};
};
