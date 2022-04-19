const express=require('express');


const app = express();
app.use(express.json());

app.enable('trust proxy')
let count=0;
let start;
let end;
const data=[]
app.get('/', function (req, res) {
    try{
        let ip=req.ip;

            count++;
            const date=new Date();
            start=Math.floor(date.getTime()/1000)
            console.log(start)
        if(!data.length){
            end=start+60
            data.push({ip:ip,start:start,end:end,count:count})
        }
        
        for(let j=0; j<data.length; j++){
            
            

            if(data[j].ip!==ip){
                count=1
                if(count===1){
                    end=start+60
                    data.push({ip:ip,start:start,end:end,count:count})
                }
            }
            if(data[j].ip===ip){
                data[j].count++
                data[j].start= start
            }
            if(data[j].count>10&&data[j].start<data[j].end){
                return res.status(404).send("reached limit")
            }
            
            

            for(let i=0; i<data.length; i++){
                if(data[i].end<start){
                    count=0;
                    data.splice(i, 1)
                }
            }
            
        }   
        console.log(data)
        
        // if(data.s.length){
        //     count++;
        //     const date=new Date();
        //     start=Math.floor(date.getTime()/1000)
        //     if(count===1){
        //         end=start+60
        //     }
        //     if(count>10&&start<end){
        //         return res.status(404).send("you can hit the server only 10 times in one minute")
        //     }
        //     if(start>=end){
        //         count=0;
        //         end=0;
        //     }
        
            
            

        //     console.log(count,start,end,data.s)
        // }
        
        
        return res.send("hi");
    }
    catch(err){
        return res.status(404).send(err.message)
    }
  
});


app.listen(2345,()=>{
    console.log("listening on port 2345")
})