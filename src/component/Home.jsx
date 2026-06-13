import Header from "./Header";
import Slidebar from "./Slidebar";
import VideoCard from "./VideoCard";
import { useState, useEffect } from "react";
import axios from "axios";
function Home() {
  const [showSide, setShowSide] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredVideo = videos.filter((video) => {
    const matchSearch = video.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ? true : video.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <Header
        toggleHide={() => setShowSide(!showSide)}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        showSide={showSide}
      />

      <div className="mainContainer">
        <Slidebar showSide={showSide} />

        <div className={showSide ? "videoGrid" : "videoGridFull"}>
          {filteredVideo.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
