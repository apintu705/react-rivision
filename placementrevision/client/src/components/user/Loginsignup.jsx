import React from 'react'
import {Link} from "react-router-dom"
import "./loginsignup.css";
import Loader from "../../components/layout/loader/Loader"
import {useSelector,useDispatch} from "react-redux"
import {login,clearerrors} from "../../action/useraction"
import {useNavigate} from "react-router-dom"

function Loginsignup() {
    const navigate = useNavigate()
    const [loginemail,setloginemail]=React.useState("");
    const [loginpassword,setloginpassword]=React.useState("")
    const dispatch=useDispatch()
    const {error,loading,isauthinciteduser}=useSelector((state)=>state.user);

    React.useEffect(() => {
        if(error) {
            dispatch(clearerrors())
        }
        if(isauthinciteduser){
            navigate("/account")
        }
    },[dispatch,error,isauthinciteduser,navigate])
    
    
    const loginsubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginemail,loginpassword))
    }
    
    
  return (
    <>{loading?<Loader/>:<>
    <div className="loginsignupcontainer">
        <div className="loginsignupbox">
            <div>
                <div className="loginsignuptoggle">
                    <h3>If you have not already Register<Link to="/register">Click to Register</Link></h3>
                </div>
                
            </div>
            <form className="loginform"  onSubmit={loginsubmit}>
                <div className="loginemail">
                    <label>EMAIL</label>
                    <br/>
                    <input type="email"
                    placeholder="Email"
                    required
                    value={loginemail}
                    onChange={(e)=>setloginemail(e.target.value)} />
                </div>
                <div className="loginpassword">
                    <label>PASSWORD</label>
                    <br/>
                    <input type="password"
                    placeholder="Password"
                    required
                    value={loginpassword}
                    onChange={(e)=>setloginpassword(e.target.value)} />
                </div>
                <Link to="/password/forget">Forget Password</Link>
                <input className="loginbtn" type="submit" value="SUBMIT"/>
            </form>


            
        </div>
    </div>
    </>}</>
  )
}

export default Loginsignup