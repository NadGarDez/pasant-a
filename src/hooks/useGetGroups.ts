import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { type listReducerInterface } from "../types/reduxTypes";
import { type group } from "../types/groupTypes";
import { getGroupsSagasAction } from "../sagas/groupSagas";
import { groupsSelector } from "../redux/slicers/groupsSlice";

interface reload {
	reload: (params: { page: number; limit: number }) => void;
}

export const useGetGroups = (): listReducerInterface<group> & reload => {
	const reload = (params: { page: number; limit: number }): void => {
		dispatch(getGroupsSagasAction(params));
	};

	const events = useAppSelector(groupsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const { status, page, limit } = events;
		if (status === "NEUTRAL") {
			dispatch(
				getGroupsSagasAction({
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
