import { LOGIN_FAIL,LOGIN_REQUESTS,LOGIN_SUCCESS ,CLEAR_ERRORS,
    REGISTER_FAIL,REGISTER_REQUESTS,REGISTER_SUCCESS,
    LOAD_FAIL,LOAD_REQUESTS,LOAD_SUCCESS,
    LOGOUT_SUCCESS,LOGOUT_FAIL ,
UPDATE_PROFILE_FAIL,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUESTS,UPDATE_PROFILE_RESET, 
UPDATE_PASSWORD_REQUESTS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,} from "../constants/userconst"
import axios from "axios"

export const login=(email,password)=>async(dispatch)=>{
    try{
        const config={headers: {"content-type": "application/json"}}
        dispatch({type:LOGIN_REQUESTS})
        const {data} = await axios.post("/api/login",{email,password},config);
        
        dispatch({type:LOGIN_SUCCESS,payload:data.user})
    }
    catch(e){
        dispatch({type:LOGIN_FAIL,payload:e.response.data.message})
    }


}


export const register=(user)=>async(dispatch)=>{
    try{
        let name=user.name;
        let email=user.email;
        let password=user.password;
        const config={headers: {"content-type": "application/json"}}
        dispatch({type:REGISTER_REQUESTS})
        const {data} = await axios.post("/api/register",{name,email,password},config);
        console.log(data)
        dispatch({type:REGISTER_SUCCESS,payload:data.user})
    }
    catch(e){
        dispatch({type:REGISTER_FAIL,payload:e.response.data.message})
    }
}

export const loaduser=()=>async(dispatch)=>{
        try{
            const config={headers: {"content-type": "application/json"}}
            dispatch({type:LOAD_REQUESTS})
            const {data} = await axios.get("/api/me",config);
            
            dispatch({type:LOAD_SUCCESS,payload:data.user})
        }
        catch(e){
            dispatch({type:LOAD_FAIL,payload:e.response.data.message})
        }
    
    
}


export const logout=()=>async(dispatch)=>{
    try{
        const config={headers: {"content-type": "application/json"}}
        
        const {data} = await axios.get("/api/logout",config);
        
        dispatch({type:LOGOUT_SUCCESS,payload:data.user})
    }
    catch(e){
        dispatch({type:LOGOUT_FAIL,payload:e.response.data.message})
    }


}


export const updateprofile=(update)=>async(dispatch)=>{
    try{
        let name=update.name;
        let email=update.email;
        
        const config={headers: {"content-type": "application/json"}}
        dispatch({type:UPDATE_PROFILE_REQUESTS})
        const {data} = await axios.put("http://localhost:3000/api/me/updateprofile",{name,email},config);
        
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.user})
    }
    catch(e){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:e.response.data.message})
    }
}



export const updatepassword=(update)=>async(dispatch)=>{
    try{
        
        let oldpassword =update.oldpassword;
        let newpassword = update.newpassword;
        let confpassword=update.confpassword;
        
        const config={headers: {"content-type": "application/json"}}
        dispatch({type:UPDATE_PASSWORD_REQUESTS})
        const {data} = await axios.put("http://localhost:3000/api/changepassword",{oldpassword,newpassword,confpassword},config);
        
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.user})
    }
    catch(e){
        dispatch({type:UPDATE_PASSWORD_FAIL,payload:e.response.data.message})
    }
}


export const clearerrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,
        
    })
}