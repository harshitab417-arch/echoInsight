import Paper from "../models/Paper.js";
import Quiz from "../models/Quiz.js";
import { generateQuizFromText } from "../services/quizService.js";

export const generateQuizController = async (req, res, next) => {
  try {
    const { paperId } = req.body;

    const paper = await Paper.findOne({
      _id: paperId,
      uploadedBy: req.user._id,
    });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const quizData = await generateQuizFromText(paper.extractedText);

    const quiz = await Quiz.create({
      paper: paper._id,
      questions: quizData,
      createdBy: req.user._id,
    });

    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};