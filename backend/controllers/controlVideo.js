import Video from "../models/modelVideo.js";
import Channel from "../models/Channel.js";
// Get All Videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Video
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video Not Found",
      });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Video
const createVideo = async (req, res) => {
  try {

    const video = await Video.create({
      ...req.body,
      owner: req.user.userId,
    });

    await Channel.findByIdAndUpdate(
      req.body.channelId,
      {
        $push: {
          videos: video._id,
        },
      }
    );

    res.status(201).json({
      message: "Video Added Successfully",
      video,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// Get Videos By Channel
const getVideosByChannel = async (req, res) => {
  try {
    const videos = await Video.find({
      channelId: req.params.channelId,
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Video
const updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Video Updated Successfully",
      updatedVideo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Video
const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Video Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Comment
const addComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    video.comments.push({
      text: req.body.text,
    });

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Edit Comment
const editComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    video.comments[req.params.commentIndex].text = req.body.text;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    video.comments.splice(req.params.commentIndex, 1);

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    const userId = req.user.userId;

    if (
      video.likedBy.some(
        (id) => id.toString() === userId
      )
    ) {
      return res.json({
        message: "Already liked",
      });
    }

    video.dislikedBy = video.dislikedBy.filter(
      (id) => id.toString() !== userId
    );

    video.likedBy.push(userId);

    video.likes = video.likedBy.length;
    video.dislikes = video.dislikedBy.length;

    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    const userId = req.user.userId;

    if (
      video.dislikedBy.some(
        (id) => id.toString() === userId
      )
    ) {
      return res.json({
        message: "Already disliked",
      });
    }

    video.likedBy = video.likedBy.filter(
      (id) => id.toString() !== userId
    );

    video.dislikedBy.push(userId);

    video.likes = video.likedBy.length;
    video.dislikes = video.dislikedBy.length;

    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  getAllVideos,
  getVideoById,
  createVideo,
  getVideosByChannel,
  updateVideo,
  deleteVideo,
  addComment,
  editComment,
  deleteComment,
  likeVideo,
  dislikeVideo,
};
