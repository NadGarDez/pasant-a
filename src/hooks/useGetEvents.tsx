import { useEffect } from "react";
import { type eventsSliceInterface } from "../types/events";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { eventsSelector } from "../redux/slicers/eventsSlice";
import { getEventsSagasAction } from "../sagas/eventSagas";

interface reload {
	reload: (params: { page: number; limit: number }) => void;
}

export const useGetEvents = (): eventsSliceInterface & reload => {
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
