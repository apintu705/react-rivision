import React from 'react'
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import TextField from '@mui/material/TextField';
import {useDispatch} from "react-redux"
import {detailsaction} from "../redux/action"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

export default function Home() {
  const dispatch = useDispatch();
    const {token,alldata}=useSelector((state)=>{return state.admin})
   
    const [gen,setgen]=React.useState("");
    const [ag,setag]=React.useState("")
    
    console.log(ag)
  return (
    <div>
      {token?<div>
        <div>
        <TextField id="filled-basic" label="Filter by name" variant="filled" onChange={(e)=>setgen(e.target.value)} />
        <TextField id="filled-basic" label="Filter by age" variant="filled" onChange={(e)=>setag(e.target.value)} />
        
        </div>
        <h1>{alldata.schoolname}</h1>
        <hr/>
        {alldata.teacher.filter((e) =>{if(gen!==null){
          return e.name.includes(gen)
        }
        if(ag!==null){
          return e.age.includes(ag)
        }
      })
        
        .map((teacher,i)=>
        <div key={i} style={{marginTop:"50px",width:"30%", display:"inline-flex"}}>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <img src={teacher.image} alt={teacher.name}  />
        <Typography variant="h5" component="div">
            
            {teacher.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {teacher.genders}
          </Typography>
          
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {teacher.age}
          </Typography>
          <Typography variant="body2">
            
            No of classes assigned:---{teacher.class.length}
            
          </Typography>
          <br/>
          <br/>
          <Button variant="contained" color="success"
          onClick={(e)=>{dispatch(detailsaction(teacher._id))}}>
        <Link to={`/class/${teacher._id}`}>find class details</Link>
      </Button>
        </CardContent>
        
      </Card>
      
      </div>
        )}
      </div>:<div style={{fontSize:"20px",fontWeight:"bold"}}><Link to={"/admin"}>click here... to login first</Link></div>}
    </div>
    
    
  )
}

