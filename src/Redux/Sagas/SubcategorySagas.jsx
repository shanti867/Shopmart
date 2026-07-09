import { put, takeEvery } from "redux-saga/effects"
import {} from "../Constant"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("subcategory", action.payload)
    yield put({type: CREATE_SUBCATEGORY_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("subcategory")
    yield put({type: GET_SUBCATEGORY_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("subcategory", action.payload.id, action.payload.data)
    yield put({type: UPDATE_SUBCATEGORY_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("subcategory", action.payload.id)
    yield put({type: DELETE_SUBCATEGORY_RED, payload: response})
}

export default function* SubcategorySaga(){         
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)  //Watcher
    yield takeEvery(GET_SUBCATEGORY, getSaga)        //Watcher
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)   //Watcher
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)   //Watcher
}