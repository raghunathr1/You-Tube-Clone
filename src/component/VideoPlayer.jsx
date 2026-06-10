import { useParams } from "react-router-dom"
import videos from "../data/video"
import { useState } from "react"

function VideoPlayer(){
    const {id} = useParams()
    const video = videos.find((video) => video.videoId == id)
    const [likes, setLikes] = useState(video.likes || 0)
    const [dislikes, setDislikes] = useState(video.dislikes || 0)
    const [comment, setComment] = useState([])
    const [newComment, setNewComment] = useState("")
    const [editIndex, setIndex] = useState(null)
    const [editText , setText] = useState("")

    const handleAddCommnet = ()=>{
        if (!newComment.trim()) return;
        setComment([...comment, newComment])
        setNewComment("")
    }

    const handleDeleteComment = (index) => {
    const updatedComments = comment.filter(
        (_, i) => i !== index
    );

    setComment(updatedComments);
    }

    const handleSaveComment = () => {
    const updatedComments = [...comment];
    updatedComments[editIndex] = editText;
    setComment(updatedComments);
    setIndex(null);
    setText("");
    };

    return (
        <div>
            <h1>{video.title} </h1>
            <img src={video.thumbnailUrl} alt={video.title} width="700"/>
            <h3>{video.channelName}</h3>
            <p>{video.description}</p>
            <button onClick={()=>setLikes(likes+1)}>👍 {likes}</button>
            <button onClick={()=>setDislikes(dislikes+1)}>👎 {dislikes} </button>
            <input type="text" placeholder="Add Comment" value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
            <button onClick={handleAddCommnet}>Add Comment</button>

            {comment.map((comment, index)=>(
                <div key={index}>
                    {editIndex === index ?(
                        <>
                        <input value={editText} onChange={(e)=>setText(e.target.value)} />
                        <button onClick={handleSaveComment}>save</button>
                        </>
                    ) : (
                        <>
                        <p>{comment}</p>
                        <button onClick={() => handleDeleteComment(index)}> Delete </button>
                        <button onClick={()=>{setIndex(index); setText(comment)}}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
export default VideoPlayer