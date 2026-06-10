import './App.css'
import { FaYoutube } from "react-icons/fa";
import Home from './component/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoPlayer from './component/VideoPlayer';

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/video/:id' element={<VideoPlayer />}></Route> 
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
