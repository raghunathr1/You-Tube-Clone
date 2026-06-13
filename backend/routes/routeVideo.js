const express = require("express");
const router = express.Router();

const { getAllVideos, getVideoById, createVideo, getVideosByChannel, updateVideo, deleteVideo, addComment, editComment, deleteComment,} = require("../controllers/controlVideo");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.post( "/upload", authMiddleware, createVideo);

router.get( "/channel/:channelId", getVideosByChannel);

router.put( "/:id", authMiddleware, updateVideo);

router.delete( "/:id", authMiddleware, deleteVideo);

router.post( "/:id/comment", addComment);

router.put( "/:id/comment/:commentIndex", editComment);

router.delete( "/:id/comment/:commentIndex", deleteComment);

module.exports = router;