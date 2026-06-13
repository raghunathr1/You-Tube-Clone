import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function ChannelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [channel, setChannel] = useState({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/channel/${id}`)
      .then((res) => setChannel(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:4000/api/videos/channel/${id}`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/videos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setVideos(videos.filter((video) => video._id !== id));

      alert("Video Deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <img src={channel.channelBanner} alt="banner" width="100%" height="220" />

      <h1>{channel.channelName}</h1>

      <p>{channel.subscribers} Subscribers</p>

      <p>{channel.description}</p>

      <hr />

      <h2>Channel Videos</h2>

      {videos.length === 0 ? (
        <p>No Videos Uploaded Yet</p>
      ) : (
        videos.map((video) => (
          <div
            key={video._id}
            style={{
              marginBottom: "20px",
            }}
          >
            <h3>{video.title}</h3>

            <img src={video.thumbnailUrl} alt={video.title} width="250" />

            <p>{video.category}</p>

            <p>{video.views} Views</p>
            <button onClick={() => navigate(`/edit-video/${video._id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(video._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ChannelPage;
