import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import { loaduser, updateprofile } from '../../action/useraction';
import Loader from "../../components/layout/loader/Loader"
import {useNavigate} from "react-router-dom"
import Metadata from "../layout/metadata"

function Updateprofile() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {loading,user,isauthinciteduser,error,}=useSelector((state)=>state.user)
  const [update,setupdate]=React.useState({name:user.name,email:user.email})
  const {name,email}=update
  const registerdatachange=(e)=>{
    setupdate({...update,[e.target.name]:e.target.value})
  }

  const updatesubmit=(e)=>{
    e.preventDefault()
    dispatch(updateprofile(update));
    dispatch(loaduser())
    navigate("/account")
  }
  return (
    <>
    {loading?<Loader/>:
    <>
    <Metadata title={`Update:-${user.name}`}/>
    <div className="loginsignupcontainer">
        <div className="loginsignupbox">
            <div>
                <div className="loginsignuptoggle">
                    
                </div>
                <form className="signupform"  encType="multipart/form-data"
            onSubmit={updatesubmit} >
              <h2>Update Profile

              </h2>
                
                <div className="signupname">
                    <label>NAME</label>
                    <br/>
                    <input type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={name}
                    onChange={registerdatachange} />
                </div>
                <div className="signupemail">
                    <label>EMAIL</label>
                    <br/>
                    <input type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={registerdatachange} />
                </div>
                
                <input type="submit" value="UPDATE PROFILE" className="signupbtn"/>
            </form>
            </div>
            </div>
            </div>
    </>}
    </>
  )
}

export default Updateprofile