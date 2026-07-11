import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("feature", action.payload)
    yield put({type: CREATE_FEATURE_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("feature")
    yield put({type: GET_FEATURE_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("feature", action.payload.id, action.payload.data)
    yield put({type: UPDATE_FEATURE_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("feature", action.payload.id)
    yield put({type: DELETE_FEATURE_RED, payload: response})
}

export default function* FeatureSaga(){         
    yield takeEvery(CREATE_FEATURE, createSaga)  //Watcher
    yield takeEvery(GET_FEATURE, getSaga)        //Watcher
    yield takeEvery(UPDATE_FEATURE, updateSaga)   //Watcher
    yield takeEvery(DELETE_FEATURE, deleteSaga)   //Watcher
}