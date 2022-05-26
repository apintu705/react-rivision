import { ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO } from "../constants/cartcont";
import axios from "axios";


export const addtocart=(id,quantity)=>async(dispatch,getState)=>{
        
        const {data} = await axios.get(`/api/product/${id}`)
        
        dispatch({type: ADD_TO_CART,payload:{
            product:data.data._id,
            name:data.data.name,
            price:data.data.price,
            image:data.data.images[0].url,
            stock:data.data.stock,
            quantity,
        }});
    
        
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    
}

export const removetocart=(id)=>(dispatch,getState)=>{
    dispatch({type: REMOVE_CART_ITEM,
      payload:id})


      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}


export const saveshippinginfo=(data)=>(dispatch)=>{
  dispatch({type:SAVE_SHIPPING_INFO,
  payload:data})
  localStorage.setItem("shippingInfo", JSON.stringify(data))
}