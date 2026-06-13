import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/videos/${id}`)
      .then((res) => {
        const data = res.data;

        setTitle(data.title);
        setDescription(data.description);
        setVideoUrl(data.videoUrl);
        setThumbnailUrl(data.thumbnailUrl);
        setCategory(data.category);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/videos/${id}`,
        {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          category,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      alert("Video Updated Successfully");

      navigate(`/video/${id}`);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Video</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Thumbnail URL"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleUpdate}>Update Video</button>
    </div>
  );
}

export default EditVideo;
