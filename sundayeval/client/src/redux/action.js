import axios from 'axios'


export const adminaction=(data)=>async(dispatch) =>{ 

    try{
        
        const token=await axios.post("http://localhost:2345/school/admin",{
            schoolname:data.schoolname,
            password:data.password,
        }).then ((e)=>{return e.data})
        
        const action={
            type:"ADMIN",
            payload:token,
        }

        dispatch(action);
    }
    catch(e){
        console.log(e)
    }


    
    
}


export const detailsaction=(id)=>async(dispatch) =>{ 

    try{
        
        const data=await axios.get(`http://localhost:2345/teacher/${id}`
        ).then ((e)=>{return e.data})
        
        const action={
            type:"DETAILS",
            payload:data,
        }

        dispatch(action);
    }
    catch(e){
        console.log(e)
    }


    
    
}