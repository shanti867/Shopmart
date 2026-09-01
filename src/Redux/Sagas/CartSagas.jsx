import { put, takeEvery } from "redux-saga/effects"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, GET_ACTIVE_CART, UPDATE_CART, UPDATE_CART_RED } from "../Constant"

function* createSaga(action){        //worker
    let response = yield createMultipartRecord("user/cart", action.payload)
    yield put({type: CREATE_CART_RED, payload: response})
}
function* getSaga(){        //worker
    let response = yield getRecord("user/cart")
    yield put({type: GET_CART_RED, payload: response})
}
function* getActiveSaga(){        //worker
    let response = yield getRecord("user/cart/active")
    yield put({type: GET_CART_RED, payload: response})
}
function* updateSaga(action){        //worker
    let response = yield updateMultipartRecord("user/cart", action.payload.id, action.payload.data)
    yield put({type: UPDATE_CART_RED, payload: response})
}
function* deleteSaga(action){        //worker
    let response = yield deleteRecord("user/cart", action.payload.id)
        if(response){
            yield put({
                type:DELETE_CART_RED,
                payload:{
                    id:action.payload.id
                }
            })
        }
}

export default function* CartSaga(){         
    yield takeEvery(CREATE_CART, createSaga)  //Watcher
    yield takeEvery(GET_CART, getSaga)        //Watcher
     yield takeEvery(GET_ACTIVE_CART, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_CART, updateSaga)   //Watcher
    yield takeEvery(DELETE_CART, deleteSaga)   //Watcher
}