
import { CREATE_TESTIMONIAL, DELETE_TESTIMONIAL, GET_TESTIMONIAL, UPDATE_TESTIMONIAL, GET_ACTIVE_TESTIMONIAL } from "../Constant"

export function createTestimonial(data){
    return{
        type: CREATE_TESTIMONIAL,
        payload: data
    }
}

export function getTestimonial(){
    return{
        type: GET_TESTIMONIAL,
    }
}
export function getActiveTestimonial() {
    return {
        type: GET_ACTIVE_TESTIMONIAL
    };
}

export function updateTestimonial(id, data){
    return{
        type: UPDATE_TESTIMONIAL,
        payload: {
            id:id,
            data:data
        }
    }
}

export function deleteTestimonial(data){
    return{
        type: DELETE_TESTIMONIAL,
        payload: data
    }
}
