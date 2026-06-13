const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    channelName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        text: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);