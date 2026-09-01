import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED, GET_ACTIVE_NEWSLETTER, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("newsletter", action.payload)
    yield put({type: CREATE_NEWSLETTER_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("newsletter")
    yield put({type: GET_NEWSLETTER_RED, payload: response})
}
function* getActiveSaga(){        //worker
    let response = yield getRecord("newsletter/active")
    yield put({type: GET_NEWSLETTER_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("newsletter", action.payload.id, action.payload.data)
    yield put({type: UPDATE_NEWSLETTER_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("newsletter", action.payload.id)
        if(response){
            yield put({
                type:DELETE_NEWSLETTER_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* NewsletterSaga(){         
    yield takeEvery(CREATE_NEWSLETTER, createSaga)  //Watcher
    yield takeEvery(GET_NEWSLETTER, getSaga)        //Watcher
     yield takeEvery(GET_ACTIVE_NEWSLETTER, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)   //Watcher
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)   //Watcher
}