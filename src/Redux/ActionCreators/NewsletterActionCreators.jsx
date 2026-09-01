
import { CREATE_NEWSLETTER, DELETE_NEWSLETTER, GET_NEWSLETTER, UPDATE_NEWSLETTER, GET_ACTIVE_NEWSLETTER } from "../Constant"

export function createNewsletter(data){
    return{
        type: CREATE_NEWSLETTER,
        payload: data
    }
}

export function getNewsletter(){
    return{
        type: GET_NEWSLETTER,
    }
}
export function getActiveNewsletter() {
    return {
        type: GET_ACTIVE_NEWSLETTER
    };
}

export function updateNewsletter(id, data){
    return{
        type: UPDATE_NEWSLETTER,
        payload: {
            id:id,
            data:data
        }
    }
}

export function deleteNewsletter(data){
    return{
        type: DELETE_NEWSLETTER,
        payload: data
    }
}
