import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/Index"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createRecord("faq", action.payload)
    yield put({type: CREATE_FAQ_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("faq")
    yield put({type: GET_FAQ_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateRecord("faq", action.payload.id, action.payload.data)
    yield put({type: UPDATE_FAQ_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("faq", action.payload.id)
        if(response){
            yield put({
                type:DELETE_FAQ_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* FaqSaga(){         
    yield takeEvery(CREATE_FAQ, createSaga)  //Watcher
    yield takeEvery(GET_FAQ, getSaga)        //Watcher
    yield takeEvery(UPDATE_FAQ, updateSaga)   //Watcher
    yield takeEvery(DELETE_FAQ, deleteSaga)   //Watcher
}