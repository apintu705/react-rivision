import React from 'react'
import "./Header.css"
import {useNavigate} from "react-router-dom"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import {useDispatch} from "react-redux"
import { logout } from '../../../action/useraction';




function Useroptions({user}) {
    
     const navigate = useNavigate()
     const dispatch=useDispatch()

    const options = [{icon:<ListAltSharpIcon/>,name:"Orders",func:orders},
    {icon:<AccountCircleSharpIcon/>,name:"Account",func:account},
    {icon:<ExitToAppSharpIcon/>,name:"Logout",func:logoutuser},
    {icon:<ShoppingCartSharpIcon/>,name:"Cart",func:cart}]

    if(user.role === "Admin"||user.role==="admin"){
        options.unshift({icon:<DashboardCustomizeSharpIcon/>,name:"Dahboard",func:dashboard})
    }
    function dashboard(){navigate("/dahboard")};
    function orders(){navigate("/orders")};
    function logoutuser(){dispatch(logout());navigate("/")};
    function account(){navigate("/account")};
    function cart(){navigate("/cart")};


    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
    <SpeedDial
    ariaLabel="SpeedDial controlled open example"
    sx={{ position: 'absolute', bottom: 16, right: 16 }}
    className="speeddail"
    icon={<img
    className="speeddailicon"
    src={user?user.avatar.url:<SpeedDialIcon/>}
    alt="profile"/>}
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}
    >
        {options.map((items,i)=><SpeedDialAction key={i}
        icon={items.icon}
        tooltipOpen
        tooltipTitle={items.name}
        onClick={items.func}
        />)}
        
    </SpeedDial>
    </>
  )
}

export default Useroptions