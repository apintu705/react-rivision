import {CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CREATE_ORDER_REQUESTS} from "../constants/orderconst";
import axios from "axios"

export const orderfunc=(order)=>async(dispatch,getState)=>{
    try{
        console.log(order)
        dispatch({type:CREATE_ORDER_REQUESTS});

        const config={headers: {"content-type": "application/json"}};

        const {data}=await axios.post("/api/order/new",order,config)
        console.log(data)
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:CREATE_ORDER_FAIL, payload:error.response.data.message})
    }
}