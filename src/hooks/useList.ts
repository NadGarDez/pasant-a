import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
	type reduxStoreType,
	type listReducerInterface,
} from "../types/reduxTypes";
import { type PayloadAction } from "@reduxjs/toolkit";

interface reload {
	reload: (params: object) => void;
}

interface props<T> {
	selector: (state: reduxStoreType) => listReducerInterface<T>;
	action: (params: any) => PayloadAction<any>;
	aditionalProps: object;
}

export const useList = <T extends object>(
	props: props<T>,
): listReducerInterface<T> & reload => {
	const { action, aditionalProps, selector } = props;
	const reload = (params: object): void => {
		dispatch(action(params));
	};

	const item = useAppSelector(selector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const { status, page, limit } = item;

		if (status === "NEUTRAL") {
			dispatch(
				action({
					page,
					limit,
					...aditionalProps,
				}),
			);
		}
	}, []);

	return {
		reload,
		...item,
	};
};
