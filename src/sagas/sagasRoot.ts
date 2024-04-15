import { takeEvery } from "redux-saga/effects";

function* doSomething(): Generator {
	console.log("holix");
}

export default function* rootSaga(): Generator {
	yield takeEvery("SOME_ACTION", doSomething);
}
