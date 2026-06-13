import "./App.css";
import Home from "./component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChannelPage from "./component/pages/ChannelPage";
import VideoPlayer from "./component/VideoPlayer";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
import CreateChannel from "./component/pages/CreateChannel";
import UploadVideo from "./component/pages/UploadVideo";
import EditVideo from "./component/pages/EditVideo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/video/:id" element={<VideoPlayer />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/create-channel" element={<CreateChannel />} />

        <Route path="/upload-video" element={<UploadVideo />} />

        <Route path="/channel/:id" element={<ChannelPage />} />

        <Route path="/edit-video/:id" element={<EditVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
