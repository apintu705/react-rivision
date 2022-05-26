
import axios from 'axios';
import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUESTS,
CLEAR_ERRORS,PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_SUCCESS,
PRODUCT_DETAILS_REQUESTS} from "../constants/productconst";

export const getproduct=(keyword="",currentpage=1,greater=0,less=100000,categori="",rating=0)=>async(dispatch)=>{
    try{
        let url=`/api/products?keyword${keyword}&page=${currentpage}&price[gte]=${greater}&price[lte]=${less}`
        if(categori){
            url=`/api/products?keyword${keyword}&page=${currentpage}&price[gte]=${greater}&price[lte]=${less}&category=${categori}`
        }
        dispatch({
            type:ALL_PRODUCT_REQUESTS,

            
        })
        const {data}=await axios.get(url);
        
        dispatch({ 
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }
    catch(error){ 
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message

        })
    }
}


export const getproductdetails=(id)=>async(dispatch)=>{
    
    try{
       
        let  url=`/api/product/${id}`
        
        dispatch({
            type:PRODUCT_DETAILS_REQUESTS,

            
        })
        const {data}=await axios.get(url);
        
        
        dispatch({ 
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.data,
        })
    }
    catch(error){ 
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message

        })
    }
}

export const clearerrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,
        
    })
}