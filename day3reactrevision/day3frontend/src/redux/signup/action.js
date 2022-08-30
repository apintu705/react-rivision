export const SIGNUP_SUCCESS="SIGNUP_SUCCESS";
export const SIGNUP_FAILURE="SIGNUP_FAILURE";
export const SIGNUP_LOADING="SIGNUP_LOADING";
//action types


//action createColors

export const signuploading=()=>({
    type:SIGNUP_LOADING,
})

export const signupsuccess=(payload)=>({
    type:SIGNUP_SUCCESS,
    payload
})

export const signupfailure=()=>({
    type:SIGNUP_FAILURE,
})
