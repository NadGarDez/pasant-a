import { select, takeEvery } from "redux-saga/effects";
import { internalSessionSelector } from "../redux/slicers/internalSessionSlice";
// import { failEventsAction, loadEventsAction } from "../redux/slicers/eventsSlice";
// import { getEvents } from "../utils/apiRequest";
import { createAction } from "@reduxjs/toolkit";

// sagas function

function* getEventsSaga(): object {
	console.log("super evetns");
	const value: any = yield select(internalSessionSelector);
	console.log(value, "session id");
	// try {
	//     if(value.sessionID!==null){
	//         console.log('no es null')
	//         yield put(loadEventsAction());
	//         const result: object = yield call(getEvents, value.sessionID, {});
	//        console.log(result)
	//     }else {
	//         yield put(failEventsAction('super error'));
	//     }
	//  } catch (error) {
	//     console.log(error , 'super error')
	//     yield put(failEventsAction('super error'));
	//  }
}

// watchers
export function* eventsWatcher(): any {
	yield takeEvery("GET_EVENTS", getEventsSaga);
}

// action creators

export const getEventsSagasAction = createAction("GET_EVENTS");
