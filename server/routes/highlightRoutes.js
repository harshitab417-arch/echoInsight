import express from "express";
import { generateHighlightsController } from "../controllers/highlightController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/generate", protect, generateHighlightsController);
export default router;
