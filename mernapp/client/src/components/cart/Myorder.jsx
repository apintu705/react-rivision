import React from 'react'
import "./myorder.css";

import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/loader/Loader";
import {Link} from "react-router-dom";


import Typography from '@mui/material/Typography';



function Myorder() {
    const dispatch = useDispatch();
    const {loading,order}=useSelector((state)=>state.order)
    
    const {user}=useSelector((state)=>state.user)
    

    React.useEffect(() => {
        
    },[])

  return (
    <>
    <div className="myorderpage">
        

        <Typography id="myorderheading">{user.name}'s Orders </Typography>

    </div>
    </>
  )
}

export default Myorder