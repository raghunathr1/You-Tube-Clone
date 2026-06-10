import FilterButton from "./FilterButton"
import Header from "./Header";
import Slidebar from "./Slidebar";
import VideoCard from "./VideoCard";
import videos from "../data/video";
import { useState } from "react";

function Home(){
    const [showSide, setShowSide] = useState(true)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    
    // video.title.toLowerCase().includes(search.toLowerCase())
    const filteredVideo = videos.filter((video)=>{
        const matchSearch = video.title.toLowerCase().includes(search.toLowerCase())   
        const matchCategory = category === "All" ? true : video.category === category
        return matchCategory && matchSearch  
})


    return(
        <>
        <Header 
        toggleHide = {()=>setShowSide(!showSide)}
        search = {search}
        setSearch = {setSearch}
        category = {category}
        setCategory = {setCategory}
        />
        <div className="mainContainer">
            {showSide && <Slidebar />}
            <div className={showSide? "videoGrid": "videoGridFull"}>
            {filteredVideo.map((video) => (
                <VideoCard key={video.videoId} video={video} />
            ))}
        </div>

        </div>
        </>
    )
}
export default Home