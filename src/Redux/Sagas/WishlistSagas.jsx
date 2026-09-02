import { put, takeEvery } from "redux-saga/effects"
import Cookies from "js-cookie"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, GET_ACTIVE_WISHLIST, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constant"

// function* createSaga(action){        //worker
//     let response = yield createMultipartRecord("wishlist", action.payload)
//     yield put({type: CREATE_WISHLIST_RED, payload: response})
// }
// function* getSaga(){        //worker
//     let response = yield getRecord("wishlist")
//     yield put({type: GET_WISHLIST_RED, payload: response})
// }
// function* getActiveSaga(){        //worker
//     let response = yield getRecord("wishlist/active")
//     yield put({type: GET_WISHLIST_RED, payload: response})
// }
// function* updateSaga(action){        //worker
//     let response = yield updateMultipartRecord("wishlist", action.payload.id, action.payload.data)
//     yield put({type: UPDATE_WISHLIST_RED, payload: response})
// }
// function* deleteSaga(action){        //worker
//     let response = yield deleteRecord("wishlist", action.payload.id)
//         if(response){
//             yield put({
//                 type:DELETE_WISHLIST_RED,
//                 payload:{
//                     id:action.payload.id
//                 }
//             })
//         }
// }

function* createSaga(action) {

    try {

        let response = yield fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/wishlist`,
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
            throw new Error("Failed to create wishlist")
        }

        response = yield response.json()

        yield put({
            type: CREATE_WISHLIST_RED,
            payload: response
        })

    }
    catch (error) {
        console.log(error)
    }
}


function* getSaga() {

    try {

        let response = yield fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/wishlist`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            }
        )

        if (!response.ok) {
            throw new Error("Failed to fetch wishlist")
        }

        response = yield response.json()

        yield put({
            type: GET_WISHLIST_RED,
            payload: response
        })

    }
    catch (error) {
        console.log(error)
    }
}


function* deleteSaga(action) {

    try {

        let response = yield fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/wishlist/${action.payload.id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            }
        )

        if (!response.ok) {
            throw new Error("Failed to delete wishlist")
        }

        response = yield response.json()

        yield put({
            type: DELETE_WISHLIST_RED,
            payload: {
                id: action.payload.id
            }
        })

    }
    catch (error) {
        console.log(error)
    }
}

export default function* WishlistSaga(){         
    yield takeEvery(CREATE_WISHLIST, createSaga)  //Watcher
    yield takeEvery(GET_WISHLIST, getSaga)        //Watcher
    //  yield takeEvery(GET_ACTIVE_WISHLIST, getActiveSaga)         //Watcher
    // yield takeEvery(UPDATE_WISHLIST, updateSaga)   //Watcher
    yield takeEvery(DELETE_WISHLIST, deleteSaga)   //Watcher
}