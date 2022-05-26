import React from 'react'
import Checkoutsteps from "./Checkoutsteps";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./conforder.css";


function Conforder() {
    const navigate = useNavigate();
    const {shippingInfo,cartItems}=useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);
    

    const subtotal=cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)
    const shippingCharges=subtotal<1000?0:subtotal*0.05;
    const tax=subtotal*0.18;

    const totalPrice=subtotal+shippingCharges+tax;

    const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.country},`

    const proceedToPayment=()=>{
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
          };
      
          sessionStorage.setItem("orderInfo", JSON.stringify(data));
      
          navigate("/process/payment");
    }


  return (
    <>
    <Checkoutsteps activestep={1} />
    <div className="conforderpage">
        <div>
            <div className="confirmshippingArea">
                <h2>Shipping Info</h2>
                <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?user.name:""}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          
        </div>


        <div>
          <div className="orderSummary">
            <h4>Order Summery</h4>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      
    </div>
    </>
  )
}

export default Conforder