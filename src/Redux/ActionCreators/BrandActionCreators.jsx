
import { CREATE_BRAND, DELETE_BRAND, GET_BRAND, UPDATE_BRAND, GET_ACTIVE_BRAND } from "../Constant"

export function createBrand(data){
    return{
        type: CREATE_BRAND,
        payload: data
    }
}

export function getBrand(){
    return{
        type: GET_BRAND,
    }
}
export function getActiveBrand() {
    return {
        type: GET_ACTIVE_BRAND
    };
}

export function updateBrand(id, data){
    return{
        type: UPDATE_BRAND,
        payload: {
            id:id,
            data:data
        }
    }
}

export function deleteBrand(data){
    return{
        type: DELETE_BRAND,
        payload: data
    }
}
