import Paper from "../models/Paper.js";
import { askQuestion } from "../services/aiService.js";

export const askQuestionController = async (req, res) => {
  try {
    const { paperId, question } = req.body;
    const paper = await Paper.findOne({ _id: paperId, uploadedBy: req.user._id });
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    const answer = await askQuestion(paper.extractedText, question);
    res.status(200).json({ answer });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
