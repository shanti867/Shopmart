import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/Index"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constant"

function* createSaga(action) {        //worker
    let response = yield createRecord("feature", action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}
function* getSaga() {        //worker
    let response = yield getRecord("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}
function* updateSaga(action) {        //worker
    let response = yield updateRecord("feature", action.payload.id, action.payload.data)
    yield put({ type: UPDATE_FEATURE_RED, payload: response })
}
function* deleteSaga(action) {        //worker
    let response = yield deleteRecord("feature", action.payload.id)
        if(response){
            yield put({
                type:DELETE_FEATURE_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* FeatureSaga() {
    yield takeEvery(CREATE_FEATURE, createSaga)  //Watcher
    yield takeEvery(GET_FEATURE, getSaga)        //Watcher
    yield takeEvery(UPDATE_FEATURE, updateSaga)   //Watcher
    yield takeEvery(DELETE_FEATURE, deleteSaga)   //Watcher
}