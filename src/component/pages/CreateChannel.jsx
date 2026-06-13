import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");

  const navigate = useNavigate();

  const handleCreateChannel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/api/channel/create",
        {
          channelName,
          description,
          channelBanner,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );

      const data = response.data;

      localStorage.setItem("channelId", data.channel._id);

      localStorage.setItem("channelName", data.channel.channelName);

      alert(data.message);

      navigate("/upload-video");

      setChannelName("");
      setDescription("");
      setChannelBanner("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Create Channel</h1>

      <input
        type="text"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Channel Banner URL"
        value={channelBanner}
        onChange={(e) => setChannelBanner(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCreateChannel}>Create Channel</button>
    </div>
  );
}

export default CreateChannel;
