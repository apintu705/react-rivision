import React from 'react'
import "./Products.css";
import {useSelector,useDispatch} from "react-redux";
import{clearerrors,getproduct} from "../../action/productaction";
import Loader from "../layout/loader/Loader"
import Product from "../home/Product"
import {useParams} from "react-router-dom"
import Pagination from "react-js-pagination"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Metadata from "../layout/metadata"


const categories = [
  "ele",
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

function Products() {
    const dispatch=useDispatch();
    const keyword=useParams();
    
   

    const [currentpage,setcurrentpage]=React.useState(1)

    const setCurrentPageNo=(e)=>{
      setcurrentpage(e)
    }

    const [greater,setgreater]=React.useState(0);
    const[less,setless]=React.useState(1000000);
    const handleChangegreater=(e)=>{
      setgreater(e.target.value);
    }
    const handleChangeless=(e)=>{
      setless(e.target.value);
    }
    console.log(greater,less)

    const [categori,setcategori]=React.useState("")
    const handlecategories=(e)=>{
      setcategori(e.target.value);
    }


    const [rating,setrating]=React.useState(0);
    const handlerating=(e)=>{
      setrating(e.target.value);
    }

    React.useEffect(() => {
        dispatch(getproduct(keyword,currentpage,greater,less,categori,rating));
    },[dispatch,keyword,currentpage,greater,less,categori,rating]);


    const {loading,error,product,product_count,resultPerPage}=useSelector((state)=>state.products);
console.log(product_count)
  return (
    
    <>
    <Metadata title="products page"/>
    {loading?<Loader/>:<>

    <h2 className="productsheading">Products</h2>


    <div className="filterbox">
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Price greater than</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={greater}
          onChange={handleChangegreater}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={30000}>30000</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Price smaller than</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={less}
          onChange={handleChangeless}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={20000}>20000</MenuItem>
          <MenuItem value={30000}>30000</MenuItem>
          <MenuItem value={100000}>100000</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={categori}
          onChange={handlecategories}
        >
          {categories.map((e,i)=><MenuItem value={e}>{e}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">RATING</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={rating}
          onChange={handlerating}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          
        </Select>
      </FormControl>
      
    </div>

    <div className="products">
        {product&&product.map((product)=><Product key={product._id} product={product}/>)}
    </div>


    
    
    {resultPerPage<product_count&&(
            <div className="paginationBox">
    <Pagination
    activePage={currentpage}
    itemsCountPerPage={resultPerPage}
    totalItemsCount={product_count}
    onChange={setCurrentPageNo}
    nextPageText="Next"
    prevPageText="Prev"
    firstPageText="1st"
    lastPageText="Last"
    itemClass="page-item"
    linkClass="page-link"
    activeClass="pageItemActive"
    activeLinkClass="pageLinkActive"
     />
     </div>
    )}
          
    </>}
    </>
  )
}

export default Products