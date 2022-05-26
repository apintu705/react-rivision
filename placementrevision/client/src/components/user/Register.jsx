import React from 'react'
import "./loginsignup.css";
import {useSelector,useDispatch} from "react-redux"
import {register,clearerrors} from "../../action/useraction"
import {useNavigate} from "react-router-dom"
import Loader from "../../components/layout/loader/Loader"


function Register() {
    const dispatch =useDispatch();
    const navigate = useNavigate()
    const [user,setuser]=React.useState({
        name:"",
        email:"",
        password:"",
    })
    const [avatar,setavatar]=React.useState("/logo192.png")
    const {name,email,password}=user;
    const registerdatachange=(e)=>{
        if(e.target.name!==avatar){
            setuser({...user,[e.target.name]:e.target.value})
        }
    }
    const {error,loading,isauthinciteduser}=useSelector((state)=>state.user);

    React.useEffect(() => {
        if(error) {
            dispatch(clearerrors())
        }
        if(isauthinciteduser){
            // navigate("/account")
        }
    },[dispatch,error,isauthinciteduser,navigate])
    const registersubmit=(e)=>{
        e.preventDefault();
        dispatch(register(user))

    }
  return (
    <>
    {loading?<Loader/>:
    <>
    <div className="loginsignupcontainer">
        <div className="loginsignupbox">
            <div>
                <div className="loginsignuptoggle">
                    
                </div>
                <form className="signupform"  encType="multipart/form-data"
            onSubmit={registersubmit} >
                
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
                <div className="signuppassword">
                    <label>PASSWORD</label>
                    <br/>
                    <input type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={registerdatachange} />
                </div>
                <div id="registerimage">
                    <label>AVATAR</label>
                    <input type="file"
                    name="avatar"
                    accept='image/'
                    onChange={registerdatachange} />
                </div>
                <input type="submit" value="REGISTER" className="signupbtn"/>
            </form>
            </div>
            </div>
            </div>
    </>}
    </>
  )
}

export default Register