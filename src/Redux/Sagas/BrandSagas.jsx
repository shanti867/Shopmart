import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("brand", action.payload)
    yield put({type: CREATE_BRAND_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("brand")
    yield put({type: GET_BRAND_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("brand", action.payload.id, action.payload.data)
    yield put({type: UPDATE_BRAND_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("brand", action.payload.id)
    yield put({type: DELETE_BRAND_RED, payload: response})
}

export default function* BrandSaga(){         
    yield takeEvery(CREATE_BRAND, createSaga)  //Watcher
    yield takeEvery(GET_BRAND, getSaga)        //Watcher
    yield takeEvery(UPDATE_BRAND, updateSaga)   //Watcher
    yield takeEvery(DELETE_BRAND, deleteSaga)   //Watcher
}