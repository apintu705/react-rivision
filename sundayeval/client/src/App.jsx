
import './App.css';
import Home from "./components/home"
import Admin from "./components/Admin"
import { Classdetails } from './components/Classdetails';
import {Routes,Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/class/:id" element={<Classdetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
