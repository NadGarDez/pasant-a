import { useDispatch, useSelector } from "react-redux";
import type { appDispatch, reduxStoreType } from "../types/reduxTypes";

export const useAppDispatch = useDispatch.withTypes<appDispatch>();
export const useAppSelector = useSelector.withTypes<reduxStoreType>();
