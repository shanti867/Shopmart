import { put, takeEvery } from "redux-saga/effects"
import Cookies from "js-cookie"
import {  deleteRecord, getRecord} from "./Service/Index"
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, GET_ACTIVE_CHECKOUT, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constant"

function* createSaga(action){

    let response = yield fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/checkout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(action.payload)
        }
    )

    let data = yield response.json()

    yield put({
        type: CREATE_CHECKOUT_RED,
        payload: data
    })
}
// function* getSaga(){        //worker
//     let response = yield getRecord("checkout")
//     yield put({type: GET_CHECKOUT_RED, payload: response})
// }

function* getSaga() {

    let response = yield fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/checkout`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        }
    );

    let data = yield response.json();
    yield put({
        type: GET_CHECKOUT_RED,
        payload: data
    });
}

function* getActiveSaga(){        //worker
    let response = yield getRecord("checkout/active")
    yield put({type: GET_CHECKOUT_RED, payload: response})
}
function* updateSaga(action) {
    let response = yield fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/checkout/${action.payload.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify({
                orderStatus: action.payload.orderStatus,
                paymentStatus: action.payload.paymentStatus
            })
        }
    );

    let data = yield response.json();

    yield put({
        type: UPDATE_CHECKOUT_RED,
        payload: data
    });
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