import React from 'react'
import "./success.css"
import {useNavigate} from "react-router-dom"

function Success() {
    const navigate = useNavigate();
    React.useEffect(() =>{setTimeout(() =>navigate("/order/me"),2000)},[])
    
    
  return (
    <div className="success">
        
        <img src="https://i.pinimg.com/originals/b9/88/b7/b988b7c3e84e1f83ef9447157831b460.gif"
        alt="success" />
    </div>
  )
}

export default Success