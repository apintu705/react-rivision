import {useDispatch,} from "react-redux"
import {SIGNUP_SUCCESS,SIGNUP_LOADING,SIGNUP_FAILURE} from "../redux/signup/action"
import axios from "axios"
import {useState} from "react"
import { useNavigate } from "react-router-dom";

const init={
    
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    confpassword:"",
    mobile_no:"",
}

export const Signup=()=>{
    const dispatch = useDispatch();
    const [data,setdata]=useState(init);
    let navigate = useNavigate();

    const {first_name, last_name,password,confpassword,email,mobile_no}=data

    const handlechange = (e)=>{
        
        let {id,value}=e.target
        setdata((prev)=>({...prev,[id]:value}))
    }
    const handlesignup=()=>{
        dispatch({type:SIGNUP_LOADING});
        axios.post("http://localhost:8080/register",data)
        .then((err)=>{console.log(err)
            if(err.data.errors&&err.data.errors.length>0){
                
                alert(err.data.errors[0].param+" "+err.data.errors[0].msg,)
            }
            else{
                console.log("hi")
                dispatch({type:SIGNUP_SUCCESS,payload:err.data})
                
                    navigate("/login")
                
            }
        })
        .catch(err=>{console.log(err);
            
            dispatch({type:SIGNUP_FAILURE})})

    }
    
    return (
        <div>
            <label>first name</label>
            <br/>
            <input type="text" placeholder="First Name" id="first_name" value={first_name} onChange={(e)=>{handlechange(e)}}/>
            <p>must be greater than 3 words</p>
            <br/>
            <br/>
            <label>Last Name</label>
            <br/>
            <input type="text" placeholder="Last Name" id="last_name" value={last_name} onChange={(e)=>{handlechange(e)}}/>
            <p>must be greater than 3 words</p>
            <br/>
            <br/>
            <label>Email</label>
            <br/>
            <input type="email" placeholder="Email" id="email" value={email} onChange={(e)=>{handlechange(e)}}/>
            <p>must be a valid email address</p>
            <br/>
            <br/>
            <label>Password</label>
            <br/>
            <input type="password" placeholder="Password" id="password" value={password}onChange={(e)=>{handlechange(e)}}/>
            <p>must be greater than 8 char at lease one capital one small one numbric and one symbol</p>
            <br/>
            <br/>
            <label>Confrom Password</label>
            <br/>
            <input type="password" placeholder="Confrom Password" id="confpassword" value={confpassword} onChange={(e)=>{handlechange(e)}}/>
            <br/>
            <br/>
            <label>Mobile No</label>
            <br/>
            <input type="Number" placeholder="Mobile No" id="mobile_no" value={mobile_no} onChange={(e)=>{handlechange(e)}}/>
            <p>must be 10 digits</p>
            <br/>
            <br/>
            <button onClick={handlesignup}>signup</button>
            <button onClick={()=>{
                console.log("h");
                navigate("/login")
            }
            }> IF ALREADY HAVE AN ACCOUND THEN LOGIN</button>

        </div>
    )
}