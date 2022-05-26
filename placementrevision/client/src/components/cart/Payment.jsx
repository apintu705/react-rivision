import React from 'react'
import Checkoutsteps from "./Checkoutsteps";
import "./Payment.css"
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  
} from "@stripe/react-stripe-js";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnLockIcon from '@mui/icons-material/VpnLock';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { orderfunc } from '../../action/orderaction';


function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const orderinfo=JSON.parse(sessionStorage.getItem("orderInfo"))
  const get=(localStorage.getItem("stripekey"));
  
  const {user}=useSelector((state)=>state.user)
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const order={
    shippingInfo: shippingInfo,
    orderitems: cartItems,
    itemsprice:orderinfo.subtotal,
    taxprice:orderinfo.tax,
    shippingprice:orderinfo.shippingCharges,
    totalprice:orderinfo.totalPrice,
    paymentinfo:"Balance transfered using Stripe"

  }

  const submithandlar=async(e)=>{
    e.preventDefault();
      dispatch(orderfunc(order))

    navigate("/success")
    
  }
  return (
    <>
      <Checkoutsteps activestep={2} />
      <div className="paymentcontainer">
        <Elements stripe={loadStripe(get)} >
          <form className="paymentform" onSubmit={(e)=>submithandlar(e)}>
          <h2 className="paymentheading">Card Info</h2>
          <div>
            <CreditCardIcon/>
            <CardNumberElement className="paymentinput"/>
          </div>
          <div>
            <EventIcon/>
      -      <CardExpiryElement className="paymentinput"/>
          </div>
          <div>
            <VpnLockIcon/>
            <CardCvcElement className="paymentinput"/>
          </div>

          <input className="paymentbtn" type="submit" value={`pay--₹${orderinfo.totalPrice}`}/>
          
        </form>
        </Elements>
        
      </div>
      
    </>
    
  )
}

export default Payment