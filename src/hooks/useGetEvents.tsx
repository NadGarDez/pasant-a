import { useEffect } from "react";
import { type eventsSliceInterface } from "../types/events";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { eventsSelector } from "../redux/slicers/eventsSlice";
import { getEventsSagasAction } from "../sagas/eventSagas";

interface reload {
	reload: () => void;
}

export const useGetEvents = (): eventsSliceInterface & reload => {
	const reload = (): void => {
		dispatch(getEventsSagasAction());
	};

	const events = useAppSelector(eventsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (events.status === "NEUTRAL") {
			dispatch(getEventsSagasAction());
		}
	}, []);

	return {
		reload,
		...events,
	};
};
