import { CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY_RED, GET_ACTIVE_MAINCATEGORY_RED, UPDATE_MAINCATEGORY_RED } from "../Constant"
export default function MaincategoryReducer(state = 
    {
        maincategory:[],
        activeMaincategory:[]
    }, action) {
    
    switch (action.type) {
        case CREATE_MAINCATEGORY_RED:
            return { ...state, maincategory: [ ...state.maincategory, action.payload ] }

        case GET_MAINCATEGORY_RED:
           return { ...state, maincategory: action.payload }

        case GET_ACTIVE_MAINCATEGORY_RED: 
        return { ...state, activeMaincategory: action.payload }

        case UPDATE_MAINCATEGORY_RED:
            return { ...state, maincategory: state.maincategory.map(item => item.id == action.payload.id ? action.payload : item ) }

        case DELETE_MAINCATEGORY_RED:
            return { ...state, maincategory: state.maincategory.filter( item => item.id != action.payload.id ) }

        default:
            return state
    }
}