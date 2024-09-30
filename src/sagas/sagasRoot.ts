import { all } from "redux-saga/effects";
import internalApi from "./internalApiSagas";
import { eventsWatcher } from "./eventSagas";
import { configsWatcher } from "./configSagas";
import { disclaimersWatcher } from "./disclaimerSagas";
import { groupsWatcher } from "./groupSagas";
import { versionWatcher } from "./versionSagas";

export default function* rootSaga(): Generator {
	yield all([
		internalApi(),
		eventsWatcher(),
		configsWatcher(),
		disclaimersWatcher(),
		groupsWatcher(),
		versionWatcher(),
	]);
}
