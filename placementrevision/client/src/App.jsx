
import './App.css';
import Header from "./components/layout/header/Header.jsx";
import webfont from "webfontloader"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Footer from './components/layout/footer/Footer.jsx'
import Home from './components/home/Home.jsx'
import Productdetails from "./components/product/Productdetails.jsx"
import Products from "./components/product/Products.jsx"
import Search from "./components/product/Search.jsx"
import Loginsignup from "./components/user/Loginsignup"
import Register from "./components/user/Register"
import store from "./store"
import {loaduser} from "./action/useraction"
import Useroptions from "./components/layout/header/Useroptions.jsx"
import { useSelector } from 'react-redux';
import Profile from "./components/user/profile.jsx";
import Updateprofile from "./components/user/Updateprofile.jsx";
import  Updatepassword  from "./components/user/Updatepassword.jsx";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import Conforder from "./components/cart/Conforder.jsx";
import Payment from "./components/cart/Payment.jsx"
import axios from "axios"
import Success from "./components/cart/Success.jsx";
import Myorder from "./components/cart/Myorder.jsx"

function App() {
  const [stripekey,setstripekey]=React.useState("")
  const {isauthinciteduser,user}=useSelector((state)=>state.user)
  
  getstripekey()
  async function getstripekey(){
    const {data}=await axios.get("/api/stripekey")
    setstripekey(data.stripeApiKey)
  }
 localStorage.setItem("stripekey",stripekey)
  
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    }) 
     store.dispatch(loaduser())
  }, []);
  
  return (
    <BrowserRouter>
        <Header />
        {isauthinciteduser&&<Useroptions user={user}/>}
        <Routes>
          <Route exect path="/" element={<Home/>}/>
          <Route exect path="/product/:id" element={<Productdetails/>}/>
          <Route exect path="/products" element={<Products/>}/>
          <Route exect path="/products/:keyword" element={<Products/>}/>
          <Route exect path="/search" element={<Search/>}/>
          <Route exect path="/login" element={<Loginsignup/>}/>
          <Route exect path="/register" element={<Register/>}/>
          {isauthinciteduser&&<Route exect path="/account" element={<Profile/>}/> }
          {isauthinciteduser&&<Route exect path="/me/update" element={<Updateprofile/>}/> }
          {isauthinciteduser&&<Route exect path="/password/update" element={<Updatepassword/>}/> }
          <Route exect path="/cart" element={<Cart/>}/>
          <Route exect path="/shipping" element={<Shipping/>}/>
          <Route exect path="/order/confirm" element={<Conforder/>}/> 
          <Route exect path="/process/payment" element={<Payment/>}/> 
          <Route exect path="/success" element={<Success/>}/> 
          {isauthinciteduser&&<Route exect path="/order/me" element={<Myorder/>}/> }
          
        </Routes>
        <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
