import React from "react"
import {Logincontext} from "../context/logincontext"
import {useNavigate} from "react-router-dom"
export const RegisterOne=()=>{
 const {name,age,dispatch}=React.useContext(Logincontext)
 const navigate=useNavigate()

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
    return (
        <div className="maindiv">
            <div className="inputdiv">
                <div id="borderdiv">
                    <div className="btndiv" onClick={(e)=>handlenavigation(e)}>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                    </div>
                    <div className="valuediv">
                        <label>Name</label>
                        <br/>
                        <input type="text" placeholder="Name" value={name} onChange={(e)=>{dispatch({type:"NAME",payload:e.target.value})}} required/>
                        <br />
                        <br/>
                        <label>Age</label>
                        <br/>
                        <input type="Number" placeholder="Age" value={age} onChange={(e)=>{dispatch({type:"AGE",payload:e.target.value})}} required/>
                        {/* <br />
                        <br/>
                        <label>Date of Birth</label>
                        <input type="date" placeholder="Date of Birth"/> */}
                  </div>
                
                </div>      
            </div>
        </div>
        
    )
}