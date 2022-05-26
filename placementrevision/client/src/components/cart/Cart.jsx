import React from 'react'
import "./Cart.css"
import  {useNavigate} from "react-router-dom"
import Cartitemcard from "./Cartitemcard.jsx"
import {useSelector,useDispatch} from "react-redux"
import {addtocart, removetocart} from "../../action/cartaction"

function Cart() {
    const dispatch =useDispatch();
    const cartitems=useSelector((state)=>state.cart.cartItems)
    const navigate = useNavigate()
    const {isauthinciteduser ,user}=useSelector((state)=>state.user)

    const increasequantity=(id,quantity,stock) =>{
        const newquantity=quantity+1;
        
        if(stock<=quantity){
            return
        }
        dispatch(addtocart(id,newquantity))

    }
    const decreasequantity=(id,quantity,stock)=>{
        const newquantity=quantity-1;
        console.log(newquantity,id)
        if(stock<=newquantity){
                return
        }
        dispatch(addtocart(id,newquantity))
    }

    const removecartitem=(id)=>{
        dispatch(removetocart(id))
    }

    const checkouthandler=()=>{
        if(isauthinciteduser){
        navigate("/shipping")
        }else{
            navigate("/login")
        }
        
    }
    
  return (
    <>{cartitems.length===0? <div className="noitems"><h1>No items found in your cart</h1></div>:
    <>
    <div className="cartpage">
        <div className="cartheader">
            <p>Product</p>
            <p>quantity</p>
            <p>Subtotal</p>
          </div>
        {cartitems&&cartitems.map((item)=>
        <div  className="cartcontaier" key={item._id}>
        <Cartitemcard key={item._id} item={item} deletecartitem={removecartitem}/>
    <div className="cartinput">
    <button onClick={()=>decreasequantity(item.product,item.quantity,item.stock)} >-</button>
    <input readOnly type="Number" value={item.quantity} />
    <button onClick={()=>increasequantity(item.product,item.quantity,item.stock)} >+</button>
</div>
<div className="cartsubtotal">
    <p className="cartsubtotal">Subtotal &#x20b9;{`${item.price*item.quantity}`}</p>
</div>
</div>)}
        <div className="cartgrossprofit">
            <div></div>
            <div className="cartgrossprofitbox">
                <p>Gross total</p>
                <p>&#x20b9;{cartitems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )} </p>
            </div>
            <div></div>
            <div className="checkoutbtn">
                <button onClick={checkouthandler}>Check Out</button>
            </div>
        </div>
        

    </div>
    </>}
    </>
  )
}

export default Cart