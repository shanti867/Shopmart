
import { CREATE_USER, DELETE_USER, GET_USER, UPDATE_USER, GET_ACTIVE_USER } from "../Constant"

export function createUser(data){
    return{
        type: CREATE_USER,
        payload: data
    }
}

export function getUser(){
    return{
        type: GET_USER,
    }
}
export function getActiveUser() {
    return {
        type: GET_ACTIVE_USER
    };
}

export function updateUser(id, data){
    return{
        type: UPDATE_USER,
        payload: {
            id:id,
            data:data
        }
    }
}

export function deleteUser(data){
    return{
        type: DELETE_USER,
        payload: data
    }
}
