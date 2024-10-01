import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { type currentEvent } from "../types/events";
import { getFullEventSagasAction } from "../sagas/eventSagas";
import {
	clearCurrentEvent,
	currentEventSelector,
} from "../redux/slicers/currentEventSlice";

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
		dispatch(getFullEventSagasAction(idEvent));
		return () => {
			dispatch(clearCurrentEvent());
		};
	}, []);

	return {
		reload,
		...event,
	};
};
