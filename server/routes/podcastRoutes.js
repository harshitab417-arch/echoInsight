import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generatePodcast } from "../controllers/podcastController.js";
import Podcast from "../models/Podcast.js";

const router = express.Router();

router.post("/generate", protect, generatePodcast);

router.get("/list", protect, async (req, res) => {
  try {
    const podcasts = await Podcast.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
