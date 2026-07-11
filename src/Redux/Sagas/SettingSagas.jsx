import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("setting", action.payload)
    yield put({type: CREATE_SETTING_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("setting")
    yield put({type: GET_SETTING_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("setting", action.payload.id, action.payload.data)
    yield put({type: UPDATE_SETTING_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("setting", action.payload.id)
    yield put({type: DELETE_SETTING_RED, payload: response})
}

export default function* SettingSaga(){         
    yield takeEvery(CREATE_SETTING, createSaga)  //Watcher
    yield takeEvery(GET_SETTING, getSaga)        //Watcher
    yield takeEvery(UPDATE_SETTING, updateSaga)   //Watcher
    yield takeEvery(DELETE_SETTING, deleteSaga)   //Watcher
}