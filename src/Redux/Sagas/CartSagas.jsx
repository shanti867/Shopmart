import { put, takeEvery } from "redux-saga/effects"

import Cookies from "js-cookie"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, GET_ACTIVE_CART, UPDATE_CART, UPDATE_CART_RED } from "../Constant"

// function* createSaga(action){        //worker
//     let response = yield createMultipartRecord("user/cart", action.payload)
//     yield put({type: CREATE_CART_RED, payload: response})
// }
// function* getSaga(){        //worker
//     let response = yield getRecord("user/cart")
//     yield put({type: GET_CART_RED, payload: response})
// }

// ================= CREATE CART =================

function* createSaga(action) {
    try {
                console.log("CART PAYLOAD:", action.payload)
        let response = yield fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/cart`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action.payload)
            }
        )

        if (!response.ok) {
            throw new Error("Failed to create cart")
        }

        response = yield response.json()

        yield put({
            type: CREATE_CART_RED,
            payload: response
        })

    } catch (error) {
        console.log(error)
    }
}


// ================= GET CART =================

function* getSaga() {
    try {

        let response = yield fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/cart`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            }
        )

        if (!response.ok) {
            throw new Error("Failed to fetch cart")
        }

        response = yield response.json()

        yield put({
            type: GET_CART_RED,
            payload: response
        })

    } catch (error) {
        console.log(error)
    }
}


// ================= DELETE CART =================

function* deleteSaga(action) {
    try {

        let response = yield fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/cart/${action.payload.id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            }
        )

        if (!response.ok) {
            throw new Error("Failed to delete cart")
        }

        response = yield response.json()

        yield put({
            type: DELETE_CART_RED,
            payload: {
                id: action.payload.id
            }
        })

    } catch (error) {
        console.log(error)
    }
}


// function* getActiveSaga(){        //worker
//     let response = yield getRecord("user/cart/active")
//     yield put({type: GET_CART_RED, payload: response})
// }
// function* updateSaga(action){        //worker
//     let response = yield updateMultipartRecord("user/cart", action.payload.id, action.payload.data)
//     yield put({type: UPDATE_CART_RED, payload: response})
// }
// function* deleteSaga(action){        //worker
//     let response = yield deleteRecord("user/cart", action.payload.id)
//         if(response){
//             yield put({
//                 type:DELETE_CART_RED,
//                 payload:{
//                     id:action.payload.id
//                 }
//             })
//         }
// }

export default function* CartSaga(){         
    yield takeEvery(CREATE_CART, createSaga)  //Watcher
    yield takeEvery(GET_CART, getSaga)        //Watcher
    //  yield takeEvery(GET_ACTIVE_CART, getActiveSaga)         //Watcher
    // yield takeEvery(UPDATE_CART, updateSaga)   //Watcher
    yield takeEvery(DELETE_CART, deleteSaga)   //Watcher
}