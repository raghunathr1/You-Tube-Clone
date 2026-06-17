import { Link } from "react-router-dom"

function VideoCard({ video }){
    return(
        <div className="videoDis">
        <Link to={`video/${video._id}`} style={{textDecoration: "none", color: "black"}}>
        <div className="videoCard">
             <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
              <div className="videoInfo">
                <h3>{video.title}</h3>
                <p>{video.channelName}</p>
                <p>{video.views} views</p>
            </div>

        </div>
        </Link>
        </div>
    )
}
export default VideoCard