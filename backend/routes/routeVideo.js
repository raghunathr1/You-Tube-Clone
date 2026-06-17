import express from "express";
import videoController from "../controllers/controlVideo.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", videoController.getAllVideos);

router.get("/:id", videoController.getVideoById);

router.post(
  "/upload",
  authMiddleware,
  videoController.createVideo
);

router.get(
  "/channel/:channelId",
  videoController.getVideosByChannel
);

router.put(
  "/:id",
  authMiddleware,
  videoController.updateVideo
);

router.delete(
  "/:id",
  authMiddleware,
  videoController.deleteVideo
);

router.post(
  "/:id/comment",
  videoController.addComment
);

router.put(
  "/:id/comment/:commentIndex",
  videoController.editComment
);

router.delete(
  "/:id/comment/:commentIndex",
  videoController.deleteComment
);

router.put(
  "/like/:id",
  authMiddleware,
  videoController.likeVideo
);

router.put(
  "/dislike/:id",
  authMiddleware,
  videoController.dislikeVideo
);

export default router;