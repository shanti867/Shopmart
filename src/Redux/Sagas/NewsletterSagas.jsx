import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/Index"
import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED, GET_ACTIVE_NEWSLETTER, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED } from "../Constant"

function* createSaga(action) {        //worker
    let response = yield createRecord("newsletter", action.payload)
    yield put({ type: CREATE_NEWSLETTER_RED, payload: response })
}
function* getSaga() {        //worker
    let response = yield getRecord("newsletter")
    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}
function* getActiveSaga() {        //worker
    let response = yield getRecord("newsletter/active")
    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}
// function* updateSaga(action){        //worker
//     let response = yield updateMultipartRecord("newsletter", action.payload.id, action.payload.data)
//     yield put({type: UPDATE_NEWSLETTER_RED, payload: response})
// }
function* updateSaga(action) {

    try {
        let response = yield fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/newsletter/${action.payload.id}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: action.payload.status
                })
            }
        );

        let result = yield response.json();

        yield put({
            type: UPDATE_NEWSLETTER_RED,
            payload: result
        });

        // Refresh newsletter list after updating status
        yield put({
            type: GET_NEWSLETTER
        });

    } catch (error) {

        console.log("Newsletter Status Update Error:", error);

    }
}
function* deleteSaga(action) {        //worker
    let response = yield deleteRecord("newsletter", action.payload.id)
    if (response) {
        yield put({
            type: DELETE_NEWSLETTER_RED,
            payload: {
                id: action.payload.id
            }
        })
    }
}

export default function* NewsletterSaga() {
    yield takeEvery(CREATE_NEWSLETTER, createSaga)  //Watcher
    yield takeEvery(GET_NEWSLETTER, getSaga)        //Watcher
    yield takeEvery(GET_ACTIVE_NEWSLETTER, getActiveSaga)         //Watcher
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)   //Watcher
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)   //Watcher
}