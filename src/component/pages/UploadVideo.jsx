import { useState } from "react";

function UploadVideo() {

  const channelId =
    localStorage.getItem("channelId");

  const channelName =
    localStorage.getItem("channelName");

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [videoUrl, setVideoUrl] =
    useState("");

  const [thumbnailUrl, setThumbnailUrl] =
    useState("");

  const [category, setCategory] =
    useState("");

  const handleUpload = async () => {

    if (!channelId) {

      alert(
        "Please Create Channel First"
      );

      return;
    }

    try {

      const response = await fetch(
        "http://localhost:4000/api/videos/upload",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              localStorage.getItem("token"),
          },

          body: JSON.stringify({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            category,
            channelName,
            channelId,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setCategory("");

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }
  };

  return (
    <div>

      <h1>Upload Video</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Thumbnail URL"
        value={thumbnailUrl}
        onChange={(e) =>
          setThumbnailUrl(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) =>
          setVideoUrl(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload Video
      </button>

    </div>
  );
}

export default UploadVideo;