
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import {Home} from './components/home'
import {RegisterOne} from "./components/registrationone";
import {RegisterTwo} from "./components/registrationtwo";
import {Users} from "./components/users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/registration/one" element={<RegisterOne/>}/>
      <Route path="/registration/two" element={<RegisterTwo/>}/>
      <Route path="/users" element={<Users/>}/>
    </Routes>
    
  );
}

export default App;
