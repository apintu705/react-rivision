import React from 'react'
import { FiChevronsDown } from "react-icons/fi";
import "../home/Home.css"
import Product from "./Product"
import Metadata from "../layout/metadata"
import {getproduct} from "../../action/productaction"
import {useSelector,useDispatch} from "react-redux"
import Loader from "../layout/loader/Loader"






function Home() {

  
const dispatch =useDispatch();

const {loading,error,product,product_count}=useSelector((state)=>state.products);



React.useEffect(() => {
  if(error){
    alert(error)
  }
  dispatch(getproduct());
},[dispatch,error])


  return (
    <>
    {loading?<Loader/>:<>
    <Metadata title="Home page"/>
    <div className="banner">
        <p>Welcome to my website</p>
        <h1>You can find amazing products below</h1>
        <a href="#container" id="scrollbtn">
              <button>
                Click to get products <FiChevronsDown />
              </button>
        </a>

        
    </div>

    <h2 id="homeheading">Featured products</h2>

    <div id="container">
        {product&&product.map((product,i)=><Product key={i+1} product={product}/>)}
    </div>
    </>}
    
    </>
  )
}

export default Home