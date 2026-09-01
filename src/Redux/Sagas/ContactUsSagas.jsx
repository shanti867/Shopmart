import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_CONTACT_US, CREATE_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, GET_ACTIVE_CONTACT_US, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("contactus", action.payload)
    yield put({type: CREATE_CONTACT_US_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("contactus")
    yield put({type: GET_CONTACT_US_RED, payload: response})
}
function* getActiveSaga(){        //worker
    let response = yield getRecord("contactus/active")
    yield put({type: GET_CONTACT_US_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("contactus", action.payload.id, action.payload.data)
    yield put({type: UPDATE_CONTACT_US_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("contactus", action.payload.id)
        if(response){
            yield put({
                type:DELETE_CONTACT_US_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* ContactUsSaga(){         
    yield takeEvery(CREATE_CONTACT_US, createSaga)  //Watcher
    yield takeEvery(GET_CONTACT_US, getSaga)        //Watcher
     yield takeEvery(GET_ACTIVE_CONTACT_US, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_CONTACT_US, updateSaga)   //Watcher
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)   //Watcher
}