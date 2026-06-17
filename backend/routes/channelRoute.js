import express from 'express'
import Channel from '../models/Channel.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Channel
router.post(
  "/create",
  authMiddleware,
  async (req, res) => {
    try {
      const { channelName, description , channelBanner } = req.body;

      const channel = await Channel.create({
        channelName,
        description,
        channelBanner,
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

export default router;