import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { type event } from "../types/events";
import { getFullEventSagasAction } from "../sagas/eventSagas";
import { activeEventSelector } from "../redux/slicers/eventsSlice";
import { type listActiveItemInterface } from "../types/reduxTypes";

interface hookReturn {
	get: () => void;
	activeItem: listActiveItemInterface<event>;
}

export const useEvent = (idEvent: string): hookReturn => {
	const activeItem = useAppSelector(activeEventSelector);
	const dispatch = useAppDispatch();

	const get = (): void => {
		dispatch(getFullEventSagasAction(idEvent));
	};

	useEffect(() => {
		// dispatch(getFullEventSagasAction(idEvent));
		// return () => {
		// 	dispatch(clearCurrentEvent());
		// };
	}, []);

	return {
		get,
		activeItem,
	};
};
