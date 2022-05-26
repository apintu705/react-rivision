import React from 'react'
import "./cartitemcard.css"
import {Link} from "react-router-dom"


function Cartitemcard({item,deletecartitem}) {
  
  

  

  return (
    <div className="cartitemcards">
        <img src={item.image} alt={item.sad} />
        <div>
            <Link to={`/product/${item.product}`}>{item.name} </Link>
            <span>Price:&#x20b9;{`${item.price}`} </span>
            <p onClick={()=>deletecartitem(item.product)} >Remove</p>
        </div>
    </div>
  )
}

export default Cartitemcard