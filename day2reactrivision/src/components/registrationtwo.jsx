import React from "react";
import {Logincontext} from "../context/logincontext"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterTwo=()=>{
    
    const navigate=useNavigate();
 const {name,age,fixed,address,pincode,dispatch}=React.useContext(Logincontext)
 
 React.useEffect(()=>{
    if(!name||!age){
        console.log("name")
        navigate("/registration/one")
    }
 },[])
 
 

 const handlenavigation=(e)=>{
     if(e.target.innerHTML==="1"){
         navigate("/registration/one")
     }
     else if(e.target.innerHTML==="2"){
        navigate("/registration/two")
    }
    else if(e.target.innerHTML==="3"){
        navigate("/users")
    }
 }

 const handleuserdata=()=>{
     if(name&&age&&address&&pincode){
        axios.post("http://localhost:3004/Users",{name,age,fixed,address,pincode})
        navigate("/users")
     }
     else if(!name||!age||!address||!pincode){
         alert("Please fill all the input boxes")
     }
    

     
 }
    return (
        <div className="maindiv">
            <div className="inputdiv">
            <div id="borderdiv"></div>
            <div className="btndiv"onClick={(e)=>handlenavigation(e)}>
                <button>1</button>
                <button>2</button>
                <button>3</button>
            </div>
            <div className="valuediv">
                <label>state of residence:--</label>
                <br />
                
                <label>Fixed</label>
                <input type="checkbox" checked={fixed} onChange={(e)=>dispatch({type:"FIXED",payload:e.target.value})}/>
                
                <br />
                <br/>
                <label>Address</label>
                <br/>
                <input type="text" placeholder="Address" value={address} onChange={(e)=>dispatch({type:"ADDRESS",payload:e.target.value})}/>
                <br />
                <br/>
                <label>Pincode</label>
                <br/>
                <input type="text" placeholder="Pincode" value={pincode} onChange={(e)=>{dispatch({type:"PINCODE",payload:e.target.value})}}/>
                <br/>
                <br/>
                <input type="submit" value="save data" onClick={handleuserdata}/>
                </div>
                </div>     
                </div> 
            
    )
}