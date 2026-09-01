
import { CREATE_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT, UPDATE_CHECKOUT, GET_ACTIVE_CHECKOUT } from "../Constant"

export function createCheckout(data){
    return{
        type: CREATE_CHECKOUT,
        payload: data
    }
}

export function getCheckout(){
    return{
        type: GET_CHECKOUT,
    }
}
export function getActiveCheckout() {
    return {
        type: GET_ACTIVE_CHECKOUT
    };
}

export function updateCheckout(id, data){
    return{
        type: UPDATE_CHECKOUT,
        payload: {
            id:id,
            data:data
        }
    }
}

export function deleteCheckout(data){
    return{
        type: DELETE_CHECKOUT,
        payload: data
    }
}
