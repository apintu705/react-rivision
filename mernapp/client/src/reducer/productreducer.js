import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUESTS,
CLEAR_ERRORS,PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_SUCCESS,
PRODUCT_DETAILS_REQUESTS} from "../constants/productconst"
export const productreducer=(state={products:[]},action)=>{
    
    switch(action.type) {
       

        case ALL_PRODUCT_REQUESTS:
            return {
                loading:true,
                product:[]
            }
        
        case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                product:action.payload.data,
                product_count:action.payload.productcount,
                resultPerPage:action.payload.resultperpage
            }

        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state;
    }
    
}
export const productdetails=(state={productm:{}},action)=>{
    switch(action.type) {
        case PRODUCT_DETAILS_REQUESTS:
            return {
                loading:true,
                ...state,
            }

        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading:false,
                productdet:action.payload,
                
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload
            }

            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
    
            default:
                return state;
    }
}