import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { type currentEvent } from "../types/events";
import { getFullEventSagasAction } from "../sagas/eventSagas";
import { currentEventSelector } from "../redux/slicers/currentEventSlice";

interface reload {
	reload: () => void;
}

export const useEvent = (idEvent: string): currentEvent & reload => {
	const event = useAppSelector(currentEventSelector);
	const dispatch = useAppDispatch();

	const reload = (): void => {
		dispatch(getFullEventSagasAction(idEvent));
	};

	useEffect(() => {
		const { status } = event;
		if (status === "NEUTRAL") {
			dispatch(getFullEventSagasAction(idEvent));
		}
	}, [idEvent]);

	return {
		reload,
		...event,
	};
};
