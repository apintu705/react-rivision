import React from 'react'
import Reactstars from "react-rating-stars-component"
import profile from "../../images/profile.jpg"
function Reviewcard({review}) {
    const options ={
        edit:false,
        color:"rgb(128,128,128)", 
        activeColor:"tomato",
        size:25,
        value:review.rating,
        isHalf:true
    }
  return (
    <div className="reviewcard">
        <img src={profile} alt="user"/>
        <p>review.name</p>
        <Reactstars {...options}/>
        <span>{review.comment}</span>

    </div>
  )
}

export default Reviewcard