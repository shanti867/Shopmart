import { CREATE_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED } from "../Constant"
export default function CartReducer(state=[],action){
    let index
    switch(action.type){
        case CREATE_CART_RED:
            return [...state,action.payload.data]
        
        case GET_CART_RED:
            return action.payload.data

        case UPDATE_CART_RED:
            return state.map(item => item.id == action.payload.id ? action.payload : item)
        case DELETE_CART_RED:
            return state.filter(x=>x.id != action.payload.id)

        default:
            return state
    }
}