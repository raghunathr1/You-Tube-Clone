import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function VideoPlayer() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

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
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
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

      <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>

      <button onClick={() => setDislikes(dislikes + 1)}>👎 {dislikes}</button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Add Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button onClick={handleAddComment}>Add Comment</button>

      {comment.map((item, index) => (
        <div key={index}>
          {editIndex === index ? (
            <>
              <input
                value={editText}
                onChange={(e) => setText(e.target.value)}
              />

              <button onClick={handleSaveComment}>Save</button>
            </>
          ) : (
            <>
              <p>{item.text}</p>

              <button onClick={() => handleDeleteComment(index)}>Delete</button>

              <button
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
