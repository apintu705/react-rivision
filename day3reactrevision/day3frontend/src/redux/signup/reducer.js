

import { SIGNUP_SUCCESS,SIGNUP_LOADING,SIGNUP_FAILURE } from "./action";

const initial={
    loading: false,
    isAuth: false,
    error: false,
    user:""
};

export const signupreducer=(state=initial,action)=>{
    console.log(state)
    switch(action.type){
        case SIGNUP_LOADING:
        return{
            ...state,
            loading:true
        };
        case SIGNUP_FAILURE:
            return{
            ...state,
            error:true,
            loading:false,
        }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                
                user:action.payload,
                isAuth:true,
            }
        default:
            return state
    }
}