import './App.css'
import { FaYoutube } from "react-icons/fa";
import Home from './component/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoPlayer from './component/VideoPlayer';
import Login from './component/pages/Login';
import Register from './component/pages/Register';

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/video/:id' element={<VideoPlayer />}></Route> 
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
