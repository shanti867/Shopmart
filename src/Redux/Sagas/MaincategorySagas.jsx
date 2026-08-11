import { put, takeEvery } from "redux-saga/effects"

import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, GET_ACTIVE_MAINCATEGORY_RED,  GET_ACTIVE_MAINCATEGORY, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("maincategory", action.payload)
    yield put({type: CREATE_MAINCATEGORY_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("maincategory")
    yield put({type: GET_MAINCATEGORY_RED, payload: response})
}

function* getActiveSaga(){        //worker
    let response = yield getRecord("maincategory/active")
    yield put({type: GET_ACTIVE_MAINCATEGORY_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("maincategory", action.payload.id, action.payload.data)
    yield put({type: UPDATE_MAINCATEGORY_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("maincategory", action.payload.id)
        if(response){
            yield put({
                type:DELETE_MAINCATEGORY_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* MaincategorySaga(){         
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)  //Watcher
    yield takeEvery(GET_MAINCATEGORY, getSaga)         //Watcher
    yield takeEvery(GET_ACTIVE_MAINCATEGORY,getActiveSaga) //Watcher
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)   //Watcher
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)   //Watcher
}