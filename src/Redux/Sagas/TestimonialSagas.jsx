import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, GET_ACTIVE_TESTIMONIAL, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("testimonial", action.payload)
    yield put({type: CREATE_TESTIMONIAL_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("testimonial")
    yield put({type: GET_TESTIMONIAL_RED, payload: response})
}
function* getActiveSaga(){        //worker
    let response = yield getRecord("testimonial/active")
    yield put({type: GET_TESTIMONIAL_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("testimonial", action.payload.id, action.payload.data)
    yield put({type: UPDATE_TESTIMONIAL_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("testimonial", action.payload.id)
        if(response){
            yield put({
                type:DELETE_TESTIMONIAL_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* TestimonialSaga(){         
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)  //Watcher
    yield takeEvery(GET_TESTIMONIAL, getSaga)        //Watcher
     yield takeEvery(GET_ACTIVE_TESTIMONIAL, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)   //Watcher
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)   //Watcher
}