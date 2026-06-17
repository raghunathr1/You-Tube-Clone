import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editIndex, setIndex] = useState(null);
  const [editText, setText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/videos/${id}`)
      .then((res) => {
        const data = res.data;

        setVideo(data);
        setComment(data.comments || []);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!video) {
    return <h2>Loading...</h2>;
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/videos/${id}/comment`,
        {
          text: newComment,
        },
      );

      setComment(response.data.comments);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (index) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/videos/${id}/comment/${index}`,
      );

      setComment(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/videos/${id}/comment/${editIndex}`,
        {
          text: editText,
        },
      );

      setComment(response.data.comments);

      setIndex(null);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/videos/like/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    setVideo(res.data);
  };
  const handleDislike = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/videos/dislike/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    setVideo(res.data);
  };

  return (
    <div>
      <h1>{video.title}</h1>

      <iframe
        width="700"
        height="400"
        src={video.videoUrl}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <h3>{video.channelName}</h3>

      <p>{video.description}</p>

      <button className="vidBtn" onClick={handleLike}>
        <BiSolidLike /> {video.likes}
      </button>

      <button className="vidBtn" onClick={handleDislike}>
        <BiSolidDislike /> {video.dislikes}
      </button>

      <input
        className="vidBtn"
        type="text"
        placeholder="Add Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button className="vidBtn" onClick={handleAddComment}>
        Add Comment
      </button>

      {comment.map((item, index) => (
        <div key={index}>
          {editIndex === index ? (
            <>
              <input
                className="vidBtn"
                value={editText}
                onChange={(e) => setText(e.target.value)}
              />

              <button className="vidBtn" onClick={handleSaveComment}>
                Save
              </button>
            </>
          ) : (
            <>
              <p className="vidBtn">{item.text}</p>

              <button
                className="vidBtn"
                onClick={() => handleDeleteComment(index)}
              >
                Delete
              </button>

              <button
                className="vidBtn"
                onClick={() => {
                  setIndex(index);
                  setText(item.text);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default VideoPlayer;
