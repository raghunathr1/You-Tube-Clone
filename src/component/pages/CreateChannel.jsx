import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleCreateChannel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:4000/api/channel/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({
            channelName,
            description,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "channelId",
          data.channel._id
        );

        localStorage.setItem(
          "channelName",
          data.channel.channelName
        );

        alert(data.message);

        navigate("/upload-video");
      } else {
        alert(data.message);
      }

      setChannelName("");
      setDescription("");
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
        onChange={(e) =>
          setChannelName(e.target.value)
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

      <button onClick={handleCreateChannel}>
        Create Channel
      </button>
    </div>
  );
}

export default CreateChannel;