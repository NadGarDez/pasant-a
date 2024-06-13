import { all } from "redux-saga/effects";
import internalApi from "./internalApiSagas";

export default function* rootSaga(): Generator {
	yield all([internalApi()]);
}
