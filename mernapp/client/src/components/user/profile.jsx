import React from 'react'
import Metadata from "../layout/metadata"
import {Link} from  "react-router-dom";
import Loader from "../../components/layout/loader/Loader"
import {useSelector,} from "react-redux"
import {useNavigate} from "react-router-dom"
import "./profile.css"

function Profile() {
    const navigate = useNavigate()
    const {user,loading,isauthinciteduser}=useSelector((state)=>state.user)
    
    React.useEffect(() => {
        if (isauthinciteduser ===undefined) {
                navigate("/login")
        }
    },[isauthinciteduser,navigate])
  return (
      <>{loading?<Loader/>:
      <>
      <Metadata title={`${user.name}`}/>
      <div className="profilecontainer">
          <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name}/>
              <Link to="/me/update">Edit Profile</Link>
          </div>
          <div id="left">
              <div>
                  <h4>Name</h4>
                  <p>{user.name} </p>
              </div>
              <div>
                  <h4>Email</h4>
                  <p>{user.email} </p>
              </div>
              <div>
                  <h4>Joined on </h4>
                  <p>{user.createdAt} </p>
              </div>
              <div>
                  <Link to="/orders">My Ordrs</Link>
                  <br/>
                  <Link to="/password/update">Change Password</Link>
              </div>
          </div>
      </div>
      </>}</>
    
  )
}

export default Profile