import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, GET_ACTIVE_CHECKOUT, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("checkout", action.payload)
    yield put({type: CREATE_CHECKOUT_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("checkout")
    yield put({type: GET_CHECKOUT_RED, payload: response})
}
function* getActiveSaga(){        //worker
    let response = yield getRecord("checkout/active")
    yield put({type: GET_CHECKOUT_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("checkout", action.payload.id, action.payload.data)
    yield put({type: UPDATE_CHECKOUT_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("checkout", action.payload.id)
        if(response){
            yield put({
                type:DELETE_CHECKOUT_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* CheckoutSaga(){         
    yield takeEvery(CREATE_CHECKOUT, createSaga)  //Watcher
    yield takeEvery(GET_CHECKOUT, getSaga)        //Watcher
     yield takeEvery(GET_ACTIVE_CHECKOUT, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)   //Watcher
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)   //Watcher
}