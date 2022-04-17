const init={
    token:"",
    auth:false,
    alldata:"",
    classdetails:""
}
export const adminreducer=(state=init,action)=>{
    console.log(state)
    switch(action.type){
        case "ADMIN":
            
            return {...state,auth:true, token:action.payload.token,alldata:action.payload.user}

        case "DETAILS":
            return {...state, classdetails:action.payload}
        default:
            return state;
    }
}
