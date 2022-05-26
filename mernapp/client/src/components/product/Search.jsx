import React from 'react'
import {useNavigate} from "react-router-dom"
import Metadata from "../layout/metadata"
import "./Search.css"

function Search({history}) {
    const [keyword,setkeyword]=React.useState("");
    const navigate = useNavigate();
    const searchsubmithandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate(`/products`)
        }
    }


  return (
    <>
    <Metadata title="search page"/>
    <form className="searchbox" onSubmit={searchsubmithandler}>
        <input type="text"
        placeholder="Search a product..."
        onChange={(e)=>setkeyword(e.target.value)}/>
        <input type="submit" value="Search" />
    </form>
    </>
  )
}

export default Search