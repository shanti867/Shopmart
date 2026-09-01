
import { CREATE_CART, DELETE_CART, GET_CART, UPDATE_CART, GET_ACTIVE_CART } from "../Constant"

export function createCart(data){
    return{
        type: CREATE_CART,
        payload: data
    }
}

export function getCart(){
    return{
        type: GET_CART,
    }
}
export function getActiveCart() {
    return {
        type: GET_ACTIVE_CART
    };
}

export function updateCart(id, data){
    return{
        type: UPDATE_CART,
        payload: {
            id:id,
            data:data
        }
    }
}

export function deleteCart(data){
    return{
        type: DELETE_CART,
        payload: data
    }
}
