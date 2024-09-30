import { useEffect } from "react";
import { type event } from "../types/events";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { eventsSelector } from "../redux/slicers/eventsSlice";
import { getEventsSagasAction } from "../sagas/eventSagas";
import { type listReducerInterface } from "../types/reduxTypes";

interface reload {
	reload: (params: { page: number; limit: number }) => void;
}

export const useGetEvents = (): listReducerInterface<event> & reload => {
	const reload = (params: { page: number; limit: number }): void => {
		dispatch(getEventsSagasAction(params));
	};

	const events = useAppSelector(eventsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const { status, page, limit } = events;

		if (status === "NEUTRAL") {
			dispatch(
				getEventsSagasAction({
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
