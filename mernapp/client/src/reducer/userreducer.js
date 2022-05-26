import { CLEAR_ERRORS } from "../constants/productconst"
import { LOGIN_FAIL,LOGIN_REQUESTS,LOGIN_SUCCESS,
    REGISTER_FAIL,REGISTER_REQUESTS,REGISTER_SUCCESS,
LOAD_FAIL,LOAD_REQUESTS,LOAD_SUCCESS ,
LOGOUT_SUCCESS,LOGOUT_FAIL,
 UPDATE_PROFILE_FAIL,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUESTS,UPDATE_PROFILE_RESET,
UPDATE_PASSWORD_REQUESTS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,} from "../constants/userconst"

export const userreducer=(state={user:{}},action)=>{
    switch(action.type){
        case LOGIN_REQUESTS:
        case REGISTER_REQUESTS:
        case LOAD_REQUESTS:
            return {
                loading: true,
                isauthinciteduser:false
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_SUCCESS:
            return {
                ...state, 
                loading: false,
                isauthinciteduser:true,
                user:action.payload
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state, loading:false,
                user:null,
                error:action.payload
            }

        case LOAD_FAIL:
            return {
                ...state, loading:false,
                isauthinciteduser:false,
                user:null,
                error:action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:false,
            }
        

        case LOGOUT_SUCCESS:
            return {
                loading:false,
                user:null,
                isauthinciteduser:false,
            }

        case LOGOUT_FAIL:
            return {
                ...state, loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}



export const profilereducer=(state={},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUESTS:
        case UPDATE_PASSWORD_REQUESTS:
            return {
                ...state,
                loading: true,
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isupdated: action.payload
            }

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isupdated:false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:false,
            }
        default:
            return state;
    }
}