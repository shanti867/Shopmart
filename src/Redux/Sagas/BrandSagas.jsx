import { put, takeEvery } from "redux-saga/effects"
import {} from "../Constant"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("maincategory", action.payload)
    yield put({type: CREATE_MAINCATEGORY_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("maincategory")
    yield put({type: GET_MAINCATEGORY_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("maincategory", action.payload.id, action.payload.data)
    yield put({type: UPDATE_MAINCATEGORY_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("maincategory", action.payload.id)
    yield put({type: DELETE_MAINCATEGORY_RED, payload: response})
}

export default function* MaincategorySaga(){         
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)  //Watcher
    yield takeEvery(GET_MAINCATEGORY, getSaga)        //Watcher
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)   //Watcher
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)   //Watcher
}