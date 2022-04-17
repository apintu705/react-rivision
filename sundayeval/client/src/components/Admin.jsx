import React from 'react'
import {TextField,Button,Paper} from "@mui/material"
import { useDispatch,} from 'react-redux'
import {adminaction} from "../redux/action"

import {useNavigate} from "react-router-dom"

export default function Admin() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [postdata,setpostdata]=React.useState({
        schoolname:"",
        password:"",
    })
    
    // React.useEffect(()=>{dispatch(adminaction())},[dispatch])
    const handlesubmit=(e)=>{
        e.preventDefault();
        // axios.post("http://localhost:2345/school/admin",{...postdata})
        // .then((e)=>{console.log(e.data)})
        dispatch(adminaction(postdata));
        navigate("/")
    }
  return (
    <div style={{width:"500px" , margin:"auto"}}>
        <Paper>
            <form autoComplete="off" >
            <h1>Dear Admin please fill the details correctly</h1>
            <TextField name="admin" varient="outlined" label="Admin"
             fullWidth value={postdata.schoolname} 
             onChange={(e)=>{setpostdata({...postdata,schoolname:e.target.value})}}/>

             <br/>
             <br/>
             <TextField name="password" varient="outlined" label="password"
             fullWidth value={postdata.password} 
             onChange={(e)=>{setpostdata({...postdata,password:e.target.value})}}/>

             <br/>
             <br/>
             <br/>
             <Button variant="contained" color="success" size="large" type="submit" fullwidth="true"
             onClick={(e)=>handlesubmit(e)}
             > ADMIN LOGIN</Button>
            </form>
        </Paper>
    </div>
  )
}
