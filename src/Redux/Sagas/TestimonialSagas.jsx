import { put, takeEvery } from "redux-saga/effects"
import Cookies from "js-cookie"
import { deleteRecord, getRecord } from "./Service/Index"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, GET_ACTIVE_TESTIMONIAL, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constant"

// function* createSaga(action){        //worker
//     let response = yield createMultipartRecord("testimonial", action.payload)
//     yield put({type: CREATE_TESTIMONIAL_RED, payload: response})
// }

function* createSaga(action) {
    let response = yield fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/testimonial`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(action.payload)
        }
    );

    let data = yield response.json();
    yield put({
        type: CREATE_TESTIMONIAL_RED,
        payload: data
    });
}
function* getSaga() {        //worker
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}
function* getActiveSaga() {        //worker
    let response = yield getRecord("testimonial/active")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}
// function* updateSaga(action){        //worker
//     let response = yield updateMultipartRecord("testimonial", action.payload.id, action.payload.data)
//     yield put({type: UPDATE_TESTIMONIAL_RED, payload: response})
// }
function* updateSaga(action) {

    let response = yield fetch(
        `${import.meta.env.VITE_APP_BACKEND_SERVER}/testimonial/${action.payload.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(action.payload.data)
        }
    )

    let data = yield response.json()

    console.log("Update API Response:", data)

    yield put({
        type: UPDATE_TESTIMONIAL_RED,
        payload: data
    })
}

function* deleteSaga(action) {        //worker
    let response = yield deleteRecord("testimonial", action.payload.id)
    if (response) {
        yield put({
            type: DELETE_TESTIMONIAL_RED,
            payload: {
                id: action.payload.id
            }
        })
    }
}

export default function* TestimonialSaga() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)  //Watcher
    yield takeEvery(GET_TESTIMONIAL, getSaga)        //Watcher
    yield takeEvery(GET_ACTIVE_TESTIMONIAL, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)   //Watcher
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)   //Watcher
}