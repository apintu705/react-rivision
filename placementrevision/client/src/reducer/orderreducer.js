import {CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CREATE_ORDER_REQUESTS} from "../constants/orderconst";

export const orderreducer=(state={},action)=>{
    switch (action.type) {
        case CREATE_ORDER_SUCCESS:
            return {
                loading:false,
                order:action.payload,
            }

        case CREATE_ORDER_FAIL:
            return {
                loading:true,
                error:action.payload

            }

        case CREATE_ORDER_REQUESTS:
            return {
                ...state,
                loading:true
            }
        
        default:
            return state
    }
}