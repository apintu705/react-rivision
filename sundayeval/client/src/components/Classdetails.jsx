import React from 'react'
import {useParams} from "react-router-dom"

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import {useSelector} from "react-redux"


export const Classdetails=()=>{
    const data=useSelector((state)=>{
    return state.admin.classdetails})
    
    return (
        <div>
            <h1>Today`s classes details</h1>
            <hr/>
        {data[0].class
        
        .map((e,i)=>
        <div key={i} style={{marginTop:"50px",width:"30%", display:"inline-flex"}}>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          
        <Typography variant="h5" component="div">
            
            {e.grade}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {e.section}
          </Typography>
          
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {e.subject}
          </Typography>
          
        </CardContent>
        
      </Card>
      
      </div>
        )}
      
    </div>
    
    
    )
}