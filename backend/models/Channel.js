const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },

  description: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  channelBanner: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },

  subscribers: {
    type: Number,
    default: 0,
  },

  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

module.exports =
  mongoose.models.Channel ||
  mongoose.model("Channel", channelSchema);