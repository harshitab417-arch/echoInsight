import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateTTS } from "../controllers/ttsController.js";

const router = express.Router();
router.post("/generate", protect, generateTTS);
export default router;
