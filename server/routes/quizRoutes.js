// server/routes/quizRoutes.js

import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateQuizController } from "../controllers/quizController.js";

const router = express.Router();

router.post("/generate", protect, generateQuizController);

export default router;