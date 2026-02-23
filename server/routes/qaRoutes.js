import express from "express";
import { askQuestionController } from "../controllers/qaController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/ask", protect, askQuestionController);
export default router;
