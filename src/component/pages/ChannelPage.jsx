import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/videos/${videoId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setVideos(
        videos.filter((video) => video._id !== videoId)
      );

      alert("Video Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Video");
    }
  };

  return (
    <div className="channelPage">

      {/* Banner */}
      <div className="channelBanner">
        <img
          src={channel.channelBanner}
          alt="banner"
        />
      </div>

      {/* Channel Info */}
      <div className="channelInfo">
        <h1>{channel.channelName}</h1>

        <p className="subscriberCount">
          {channel.subscribers || 0} Subscribers
        </p>

        <p className="channelDescription">
          {channel.description}
        </p>
      </div>

      <hr />

      <h2 className="videoHeading">
        Channel Videos
      </h2>

      {videos.length === 0 ? (
        <p className="noVideos">
          No Videos Uploaded Yet
        </p>
      ) : (
        <div className="channelVideosGrid">
          {videos.map((video) => (
            <div
              key={video._id}
              className="channelVideoCard"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="channelThumbnail"
              />

              <h3>{video.title}</h3>

              <p>{video.category}</p>

              <p>{video.views || 0} Views</p>

              <div className="videoActions">
                <button
                  className="editBtn"
                  onClick={() =>
                    navigate(
                      `/edit-video/${video._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={() =>
                    handleDelete(video._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChannelPage;