import Header from "./Header";
import Slidebar from "./Slidebar";
import VideoCard from "./VideoCard";
import { useState, useEffect } from "react";

function Home() {
  const [showSide, setShowSide] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredVideo = videos.filter((video) => {
    const matchSearch = video.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All"
        ? true
        : video.category === category;

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
      />

      <div className="mainContainer">
        {showSide && <Slidebar />}

        <div
          className={
            showSide
              ? "videoGrid"
              : "videoGridFull"
          }
        >
          {filteredVideo.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;