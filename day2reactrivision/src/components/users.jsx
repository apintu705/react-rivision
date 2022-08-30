import axios from "axios"
import {useState,useEffect} from "react"

export const Users=()=>{
const [data,setdata]=useState([])

useEffect(()=>{
    axios.get("http://localhost:3004/Users")
    .then((e)=>setdata(...data,e.data))
},[])
console.log(data)
let k=new Date();
console.log(k)
    return (
        <div className="maindiv">
        <table className="table" border="1">
        <thead>
          <tr>
            <th>Sl.no.</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Fixed/Temporary</th>
            
          </tr>
        </thead>
        <tbody>
        {data.map((house, index) => 
            
              <tr key={house.id} className="houseDetails">
                <td className="houseId">{house.id}</td>
                <td className="houseName">{house.name} </td>
                <td className="ownersName">{house.age}</td>
                <td className="address">{house.address}</td>
                <td className="areaCode">{house.pincode}</td>
                <td className="rent">{house.fixed?"Fixed":"Temporary"}</td>
                
              </tr>
            )
        }
          
        
        </tbody>
      </table>
        </div>
    )
}