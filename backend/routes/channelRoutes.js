const express = require("express");
const router = express.Router();

const Channel = require("../models/Channel");
const authMiddleware = require("../middleware/authMiddleware");

// Create Channel
router.post(
  "/create",
  authMiddleware,
  async (req, res) => {
    try {
      const { channelName, description } = req.body;

      const channel = await Channel.create({
        channelName,
        description,
        owner: req.user.userId,
      });

      res.status(201).json({
        message: "Channel Created",
        channel,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get Single Channel
router.get("/:id", async (req, res) => {
  try {

    const channel = await Channel.findById(
      req.params.id
    );

    if (!channel) {
      return res.status(404).json({
        message: "Channel Not Found",
      });
    }

    res.status(200).json(channel);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;