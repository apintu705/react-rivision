import React from 'react';
import './App.css';
import axios from 'axios';
import ScrollToTop from "react-scroll-to-top";

function App() {
  let offset = 0;
  const [data,setdata]=React.useState([])
  const loadmoredata=()=>{
  axios.get(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`)
  .then(({data})=>{
    const name=[];
    data.results.forEach(p=>name.push(p.name));
    setdata((prev)=>([...prev,...name]))
  })
  offset+=25;
};

const handlescroll=(e)=>{
  console.log(e.target.documentElement.scrollTop);
  console.log(window.innerHeight)
  console.log(e.target.documentElement.scrollHeight);
  if((e.target.documentElement.scrollTop+window.innerHeight)+1>=e.target.documentElement.scrollHeight){
    console.log("reached");
    loadmoredata();
  }

}

React.useEffect(()=>{
  loadmoredata();
  window.addEventListener("scroll",handlescroll);
},[])
  return (
    <div className="App">
      <ScrollToTop smooth />
      {data.map((e,i)=>{
        return <div key={i} style={{ 
          displey:"flex",
          border: "1px solid red",
          width: "30%",
          height:"20px",
          marginBottom:"10px"

        }}>
          {i+1}:---{e}
        </div>
      })}
      
    </div>
  );
}

export default App;
