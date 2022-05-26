import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import { loaduser, updatepassword, } from '../../action/useraction';
import Loader from "../../components/layout/loader/Loader"
import {useNavigate} from "react-router-dom"
import Metadata from "../layout/metadata"


function Updatepassword() {
    const navigate=useNavigate()
  const dispatch=useDispatch()
  const {loading,user,isauthinciteduser,error,}=useSelector((state)=>state.user)
  const [update,setupdate]=React.useState({oldpassword:"",newpassword:"",confpassword:""})
  const {oldpassword,newpassword,confpassword}=update
  const registerdatachange=(e)=>{
    setupdate({...update,[e.target.name]:e.target.value})
  }
  
  const updatesubmit=(e)=>{
    e.preventDefault()
    dispatch(updatepassword(update));
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
              <h2>Update Password

              </h2>
                
                <div className="signupname">
                    <label>OLD Password</label>
                    <br/>
                    <input type="password"
                    placeholder="oldpassword"
                    name="oldpassword"
                    required
                    
                    onChange={registerdatachange} />
                </div>
                <div className="signupemail">
                    <label>NEW password</label>
                    <br/>
                    <input type="password"
                    placeholder="newpassword"
                    name="newpassword"
                    required
                    
                    onChange={registerdatachange} />
                </div>
                <div className="signupemail">
                    <label>confirm password</label>
                    <br/>
                    <input type="password"
                    placeholder="confpassword"
                    name="confpassword"
                    required
                    
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

export default Updatepassword