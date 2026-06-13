const Channel = require("../models/channel");

const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    const existingChannel = await Channel.findOne({
      owner: req.user.userId,
    });

    if (existingChannel) {
      return res.status(400).json({
        message: "You already have a channel",
      });
    }

    const channel = new Channel({
      channelName,
      description,
      owner: req.user.userId,
    });

    await channel.save();

    res.status(201).json({
      message: "Channel Created Successfully",
      channel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user.userId,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createChannel,
  getMyChannel,
};