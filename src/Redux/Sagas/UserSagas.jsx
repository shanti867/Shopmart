import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_USER, CREATE_USER_RED, DELETE_USER, DELETE_USER_RED, GET_USER, GET_USER_RED, GET_ACTIVE_USER, UPDATE_USER, UPDATE_USER_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("user", action.payload)
    yield put({type: CREATE_USER_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("user")
    yield put({type: GET_USER_RED, payload: response})
}
function* getActiveSaga(){        //worker
    let response = yield getRecord("user/active")
    yield put({type: GET_USER_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("user", action.payload.id, action.payload.data)
    yield put({type: UPDATE_USER_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("user", action.payload.id)
        if(response){
            yield put({
                type:DELETE_USER_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* UserSaga(){         
    yield takeEvery(CREATE_USER, createSaga)  //Watcher
    yield takeEvery(GET_USER, getSaga)        //Watcher
     yield takeEvery(GET_ACTIVE_USER, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_USER, updateSaga)   //Watcher
    yield takeEvery(DELETE_USER, deleteSaga)   //Watcher
}