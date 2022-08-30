import React from 'react';

const initialState = {
    name:"",
    age:"",
    fixed:false,
    address:"",
    pincode:"",
}


const reducer = (state,action) => {
    switch (action.type) {
        case"NAME":
        return {...state,name:action.payload}
        case"AGE":
        return {...state,age:action.payload}
        case"ADDRESS":
        return {...state,address:action.payload}
        case"PINCODE":
        return {...state,pincode:action.payload}
        case"FIXED":
        return {...state,fixed:action.payload}
        default:
            throw new Error("loading...")
    }
}

export const Logincontext= React.createContext();


export function LogincontextProvider({children}){
    const [state,dispatch]=React.useReducer(reducer,initialState);

    const {name,age,fixed,address,pincode}=state;
    return (
        <Logincontext.Provider value={{name,age,fixed,address,pincode,dispatch}}>{children}</Logincontext.Provider>
    ) 
}

