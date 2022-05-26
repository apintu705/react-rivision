import React from 'react'
import {useParams} from "react-router-dom"
import Reactstars from "react-rating-stars-component"
import "./Productdetails.css"
import Reviewcard from "./Reviewcard.jsx"
import {useSelector,useDispatch} from "react-redux"
import {getproductdetails} from "../../action/productaction"
import Loader from "../layout/loader/Loader";
import Metadata from "../layout/metadata";
import {addtocart} from "../../action/cartaction"
import {useNavigate} from "react-router-dom"


function Productdetails() {
    const [quantity,setquantity]=React.useState(1);
    const navigate = useNavigate()
    
    const dispatch=useDispatch();
    const {id}=useParams();
    

    const addtocarthandler=()=>{
        dispatch(addtocart(id,quantity))
        navigate("/cart")
        
    }


    
    React.useEffect(() => {
        dispatch(getproductdetails(id))
    },[dispatch,id])

    const {loading,productdet,error} =useSelector((state)=>state.productdetails);
    
    const decreasequantity=(e)=>{
        if(quantity>=2)
        setquantity(quantity-1);
    }
    const increasequantity=()=>{
        
        if(productdet.stock>=quantity){
            setquantity(quantity+1);
        }
    
        
    }
    const options ={
        edit:false,
        color:"rgb(128,128,128)", 
        activeColor:"tomato",
        size:25,
        value:productdet? productdet.ratings:5,
        isHalf:true
    }
  return (
    <>
    <Metadata title="productdetails page"/>
    {loading?<Loader/>:<>
    <div className="productdetails">
        <div className="imagediv">
            {productdet&&productdet.images.map((items,i)=>
            <img key={i} src={items.url} alt={items.url}/>)}
        </div>
        <div className="details">
        
        <div className="detailsblock1">
            <h1>{productdet? productdet.name:""}</h1>
            <p>product # {productdet? productdet._id:""}</p>
        </div>
        <div className="detailsblock2">
        <Reactstars {...options}/>
        <span>({productdet? productdet.no_of_reviews:"" }reviews)</span>
        </div>
        <div className="detailsblock3">
            <h1>&#x20b9;{productdet? productdet.price:""}</h1>
        </div>
        <div className="detailsblock4">
            <button onClick={(e)=>decreasequantity(e)}>-</button>
            <input readOnly id="noadded" type="Number" value={quantity}/>
            <button onClick={(e)=>increasequantity(e)}>+</button>
        </div>
        <div className="detailsblock5">
            <button onClick={addtocarthandler} className="addtocart">Add to cart</button>
        </div>
        <p id="status">
            Status:--{productdet? productdet.stock<1?"Outofstock":"Insock":""}
        </p>
        <div><p>{productdet? productdet.description:""}</p></div>

        <div><button className="submitreview">submit review</button></div>
        
        
        </div>
        
    </div>
    <h3 className="reviewsHeading">REVIEWS</h3>
    {productdet&&productdet.reviews?
        <div className="review">{productdet.review&&productdet.review.map(review=><Reviewcard review={review}/>)}</div>
        :<p className="noReviews">No Reviews Yet</p>}
    </>}
    </>
  )
}

export default Productdetails