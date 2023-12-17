import { BrowserRouter, Routes , Route } from "react-router-dom";
import './App.css'

import Signup from './components/Signup/App.jsx'
import Home from './components/Home/App.jsx'
import Login from './components/Login/App.jsx'
import NotFound from './components/NotFound/App.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        {/* <Route path="markattendance" element={<Markattendance/>}/> */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}


// this is Comment
export default App;