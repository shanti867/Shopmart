
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, GET_ACTIVE_PRODUCT, UPDATE_PRODUCT } from "../Constant"

export function createProduct(data){
    return{
        type: CREATE_PRODUCT,
        payload: data
    }
}

export function getProduct(){
    return{
        type: GET_PRODUCT,
    }
}

export function getActiveProduct() {
    return {
        type: GET_ACTIVE_PRODUCT
    };
}

export function updateProduct(id, data){
    return{
        type: UPDATE_PRODUCT,
        payload: {
            id:id,
            data:data
        }
    }
}

export function deleteProduct(data){
    return{
        type: DELETE_PRODUCT,
        payload: data
    }
}
