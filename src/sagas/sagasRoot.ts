import { all } from "redux-saga/effects";
import internalApi from "./internalApiSagas";
import { eventsWatcher } from "./eventSagas";

export default function* rootSaga(): Generator {
	yield all([internalApi(), eventsWatcher()]);
}
