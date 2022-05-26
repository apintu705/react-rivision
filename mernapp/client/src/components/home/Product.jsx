import React from 'react'
import {Link} from "react-router-dom";
import Reactstars from "react-rating-stars-component"


function Product({product}) {
    
    const options ={
        edit:false,
        color:"rgba(20,20,20,0,1)", 
        activeColor:"tomato",
        size:25,
        value:product.ratings,
        isHalf:true
    }
  return (
      
      <Link className="productcard" to={`/product/${product._id}`} key={product._id}>
          <img src={product.images[0].url} alt="product imag"/>
          <p>{product.name}</p>
          <div>
              <Reactstars {...options}/>
              <span>(${product.no_of_reviews} reviews)</span>
          </div>
          <span>&#x20b9;{product.price}</span>
      </Link>
    
  )
}

export default Product