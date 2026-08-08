import { CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED } from "../Constant"
export default function SubcategoryReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_SUBCATEGORY_RED:
            return [...state, action.payload]

        case GET_SUBCATEGORY_RED:
            return action.payload

        case UPDATE_SUBCATEGORY_RED:
            return (state.map(item => item.id == action.payload.id ? action.payload : item))

        case DELETE_SUBCATEGORY_RED:
            return state.filter(x => x.id != action.payload.id)

    return newState;

        default:
            return state
    }
}